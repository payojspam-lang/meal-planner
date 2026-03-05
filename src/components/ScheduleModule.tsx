import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, startOfWeek, endOfWeek, addMonths, subMonths, addWeeks, subWeeks } from "date-fns";
import { useAppContext } from "../context/AppContext.tsx";
import type { MealType, RecipeRecommendation } from "../types.ts";
import { DRAG_TYPE_RECIPE } from "./RecommendationOutput.tsx";
import { Calendar as CalendarIcon, Clock, Trash2, ChevronLeft, ChevronRight, Save, Eraser } from "lucide-react";
import SearchableMealInput from "./SearchableMealInput.tsx";

type CalendarView = 'month' | 'week';

export default function ScheduleModule() {
    const [activeDate, setActiveDate] = useState<Date>(new Date());
    const [calendarView, setCalendarView] = useState<CalendarView>('week');
    const { schedule, getPlan, updateSlot, clearDay } = useAppContext();

    // Manual input state
    const formattedDate = format(activeDate, "yyyy-MM-dd");
    const dailyPlan = getPlan(formattedDate);
    const [manualInputs, setManualInputs] = useState<Record<string, string>>({
        Breakfast: '',
        Lunch: '',
        Refreshment: '',
        Dinner: '',
    });

    // Calendar calculations
    const monthStart = startOfMonth(activeDate);
    const monthEnd = endOfMonth(activeDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    const monthDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    const weekStart = startOfWeek(activeDate);
    const weekEnd = endOfWeek(activeDate);
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

    const navigatePrev = () => {
        setActiveDate(prev => calendarView === 'month' ? subMonths(prev, 1) : subWeeks(prev, 1));
    };
    const navigateNext = () => {
        setActiveDate(prev => calendarView === 'month' ? addMonths(prev, 1) : addWeeks(prev, 1));
    };

    const handleDrop = (e: React.DragEvent, mealType: MealType) => {
        e.preventDefault();
        const data = e.dataTransfer.getData(DRAG_TYPE_RECIPE);
        if (!data) return;
        try {
            const recipe = JSON.parse(data) as RecipeRecommendation;
            updateSlot(formattedDate, mealType, recipe);
        } catch (err) {
            console.error("Failed to parse dropped recipe", err);
        }
    };

    const handleDragOver = (e: React.DragEvent) => e.preventDefault();

    const handleSaveManual = () => {
        const slots: MealType[] = ['Breakfast', 'Lunch', 'Refreshment', 'Dinner'];
        slots.forEach(slot => {
            const value = manualInputs[slot]?.trim();
            if (value) {
                updateSlot(formattedDate, slot, value);
            }
        });
        setManualInputs({ Breakfast: '', Lunch: '', Refreshment: '', Dinner: '' });
    };

    const handleClearDay = () => {
        clearDay(formattedDate);
        setManualInputs({ Breakfast: '', Lunch: '', Refreshment: '', Dinner: '' });
    };

    const hasData = (dayKey: string) => {
        const plan = schedule[dayKey];
        if (!plan) return false;
        return ['Breakfast', 'Lunch', 'Refreshment', 'Dinner'].some(s => plan[s as MealType] !== null && plan[s as MealType] !== undefined);
    };

    const slots: MealType[] = ['Breakfast', 'Lunch', 'Refreshment', 'Dinner'];
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const slotColors: Record<string, string> = {
        Breakfast: 'bg-amber-500',
        Lunch: 'bg-emerald-500',
        Refreshment: 'bg-blue-400',
        Dinner: 'bg-indigo-500',
    };

    // Render a day cell for the MONTH view
    const renderMonthDay = (day: Date, idx: number) => {
        const isSelected = isSameDay(day, activeDate);
        const isCurrentMonth = day.getMonth() === activeDate.getMonth();
        const dayKey = format(day, "yyyy-MM-dd");
        const isToday = isSameDay(day, new Date());
        const hasMeals = hasData(dayKey);

        return (
            <button
                key={idx}
                onClick={() => setActiveDate(day)}
                className={`
                    relative flex flex-col items-center justify-center transition-all rounded-xl aspect-square
                    ${!isCurrentMonth ? 'text-textMain/20' : 'text-textMain hover:bg-primary/10'}
                    ${isSelected ? 'bg-primary text-white font-bold hover:bg-primary' : ''}
                `}
            >
                <span className="text-sm">{format(day, "d")}</span>
                {isToday && !isSelected && <span className="text-[8px] bg-primary text-white px-1 rounded-full font-bold mt-0.5">today</span>}
                {hasMeals && !isSelected && <div className="w-1.5 h-1.5 bg-accentSienna rounded-full mt-0.5"></div>}
            </button>
        );
    };

    // Render a horizontal row for each day in the WEEK view
    const renderWeekDayRow = (day: Date) => {
        const isSelected = isSameDay(day, activeDate);
        const dayKey = format(day, "yyyy-MM-dd");
        const isToday = isSameDay(day, new Date());
        const plan = schedule[dayKey];

        return (
            <button
                key={dayKey}
                onClick={() => setActiveDate(day)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 w-full text-left transition-all ${isSelected
                    ? 'bg-primary/8 border border-primary/30 shadow-sm'
                    : 'hover:bg-gray-50 border border-transparent'
                    }`}
            >
                {/* Day + Date */}
                <div className={`w-12 text-center shrink-0 ${isSelected ? 'text-primary' : isToday ? 'text-primary' : 'text-textMain'
                    }`}>
                    <span className={`block text-[10px] font-bold uppercase tracking-wider ${isToday ? 'text-primary' : 'text-muted'
                        }`}>
                        {dayNames[day.getDay()]}
                    </span>
                    <span className="block text-xl font-bold leading-tight">
                        {format(day, "d")}
                    </span>
                    {isToday && (
                        <span className="inline-block text-[7px] bg-primary text-white px-1 py-px rounded-full font-bold mt-0.5">today</span>
                    )}
                </div>

                {/* Meal Chips */}
                <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                    {slots.map(slot => {
                        const value = plan?.[slot];
                        if (!value) return null;
                        const isRecipe = typeof value === 'object';
                        const title = isRecipe ? (value as RecipeRecommendation).title : value as string;

                        return (
                            <div
                                key={slot}
                                className={`rounded-lg px-2.5 py-1.5 text-white text-[11px] leading-tight max-w-[140px] ${slotColors[slot]}`}
                            >
                                <span className="font-semibold opacity-70 uppercase text-[8px] mr-1">{slot.slice(0, 4)}</span>
                                <span className="font-medium truncate">{title}</span>
                            </div>
                        );
                    })}
                    {!hasData(dayKey) && (
                        <span className="text-[11px] text-muted italic">No meals planned</span>
                    )}
                </div>

                {/* Indicator dot */}
                {hasData(dayKey) && !isSelected && (
                    <div className="w-2 h-2 bg-success rounded-full shrink-0"></div>
                )}
            </button>
        );
    };

    return (
        <div id="section-calendar" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Column: Calendar */}
            <div className="space-y-6">
                <div className="card text-sm xl:sticky xl:top-[120px]">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            <CalendarIcon size={20} className="text-primary" />
                            Calendar
                        </h2>
                        {/* View Switcher */}
                        <div className="flex bg-gray-100 rounded-full p-0.5">
                            <button
                                onClick={() => setCalendarView('month')}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${calendarView === 'month' ? 'bg-white shadow-sm text-textMain' : 'text-muted'}`}
                            >
                                Month
                            </button>
                            <button
                                onClick={() => setCalendarView('week')}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${calendarView === 'week' ? 'bg-white shadow-sm text-textMain' : 'text-muted'}`}
                            >
                                Week
                            </button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mb-3">
                        <button onClick={navigatePrev} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ChevronLeft size={18} /></button>
                        <h3 className="font-bold text-textMain">
                            {calendarView === 'month'
                                ? format(activeDate, "MMMM yyyy")
                                : `${format(weekStart, "MMM d")} – ${format(weekEnd, "MMM d yyyy")}`
                            }
                        </h3>
                        <button onClick={navigateNext} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ChevronRight size={18} /></button>
                    </div>

                    {/* Month View */}
                    {calendarView === 'month' && (
                        <>
                            <div className="grid grid-cols-7 gap-1 text-center font-semibold text-textMain/50 mb-2 text-[10px] uppercase">
                                {dayNames.map(d => <div key={d}>{d}</div>)}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {monthDays.map((day, idx) => renderMonthDay(day, idx))}
                            </div>
                        </>
                    )}

                    {/* Week View — Vertically Stacked Rows */}
                    {calendarView === 'week' && (
                        <div className="flex flex-col gap-1">
                            {weekDays.map(day => renderWeekDayRow(day))}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column: Daily Meal Plan */}
            <div className="space-y-3">
                <h2 className="text-xl font-bold border-b border-muted/20 pb-2">
                    {format(activeDate, "EEEE, MMMM d, yyyy")}
                </h2>

                {slots.map(slot => {
                    const currentValue = dailyPlan[slot];
                    const isRecipe = currentValue && typeof currentValue === 'object';

                    return (
                        <div
                            key={slot}
                            onDrop={(e) => handleDrop(e, slot)}
                            onDragOver={handleDragOver}
                            className={`
                border-2 border-dashed rounded-2xl p-4 transition-colors min-h-[80px]
                ${currentValue ? 'border-success/30 bg-success/5' : 'border-muted/30 hover:border-primary/50 bg-surface'}
              `}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-textMain/80 flex items-center gap-2 text-sm uppercase tracking-wider">
                                    <Clock size={14} /> {slot}
                                </h3>
                                {currentValue && (
                                    <button onClick={() => updateSlot(formattedDate, slot, null)} className="text-textMain/30 hover:text-red-500 transition-colors">
                                        <Trash2 size={14} />
                                    </button>
                                )}
                            </div>

                            {currentValue ? (
                                <div className="bg-white rounded-2xl p-4 shadow-sm border border-primary/10 animate-in fade-in duration-300">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-lg text-textMain">{isRecipe ? (currentValue as RecipeRecommendation).title : currentValue as string}</h4>
                                    </div>
                                    {isRecipe && (
                                        <p className="text-xs text-textMain/60 leading-relaxed italic">{(currentValue as RecipeRecommendation).ingredients.join(', ')}</p>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <SearchableMealInput
                                        mealType={slot}
                                        value={manualInputs[slot]}
                                        onChange={(val: string) => setManualInputs(prev => ({ ...prev, [slot]: val }))}
                                        onSelectRecipe={(title: string) => {
                                            updateSlot(formattedDate, slot, title);
                                            setManualInputs(prev => ({ ...prev, [slot]: '' }));
                                        }}
                                        placeholder={`Select or type ${slot}...`}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Save & Clear buttons */}
                <div className="flex gap-3 mt-2">
                    <button
                        onClick={handleSaveManual}
                        className="flex-1 btn-primary flex items-center justify-center gap-2 text-sm py-2.5"
                    >
                        <Save size={16} /> Save Meals
                    </button>
                    <button
                        onClick={handleClearDay}
                        className="flex-1 border border-red-200 text-red-600 rounded-xl flex items-center justify-center gap-2 text-sm py-2.5 hover:bg-red-50 transition-colors"
                    >
                        <Eraser size={16} /> Clear Day
                    </button>
                </div>
                <p className="text-xs text-textMain/50 text-center">Tip: Click a calendar date to update this form. Drag recipes from recommendations or type manually.</p>
            </div>
        </div>
    );
}
