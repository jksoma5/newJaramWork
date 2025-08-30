import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus, X } from "lucide-react";

interface MealItem {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodayMeal() {
  const [meals, setMeals] = useState<MealItem[]>([
    { id: "1", text: "아침 - 토스트와 계란", completed: false },
    { id: "2", text: "점심 - 김치찌개", completed: true },
    { id: "3", text: "저녁 - 파스타", completed: false },
  ]);
  const [newMeal, setNewMeal] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const addMeal = () => {
    if (newMeal.trim()) {
      const newItem: MealItem = {
        id: Date.now().toString(),
        text: newMeal.trim(),
        completed: false,
      };
      setMeals([...meals, newItem]);
      setNewMeal("");
    }
  };

  const deleteMeal = (id: string) => {
    setMeals(meals.filter(meal => meal.id !== id));
  };

  const toggleMeal = (id: string) => {
    setMeals(meals.map(meal => 
      meal.id === id ? { ...meal, completed: !meal.completed } : meal
    ));
  };

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id: string) => {
    setMeals(meals.map(meal => 
      meal.id === id ? { ...meal, text: editText } : meal
    ));
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">오늘의 식단</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 새 항목 추가 */}
          <div className="flex gap-2">
            <Input
              placeholder="새로운 식사를 추가하세요..."
              value={newMeal}
              onChange={(e) => setNewMeal(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addMeal()}
              className="flex-1"
            />
            <Button onClick={addMeal} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* 식단 목록 */}
          <div className="space-y-3">
            {meals.map((meal) => (
              <div
                key={meal.id}
                className="flex items-center gap-3 p-3 rounded-lg border bg-card"
              >
                <Switch
                  checked={meal.completed}
                  onCheckedChange={() => toggleMeal(meal.id)}
                />
                
                <div className="flex-1">
                  {editingId === meal.id ? (
                    <div className="flex gap-2">
                      <Input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") saveEdit(meal.id);
                          if (e.key === "Escape") cancelEdit();
                        }}
                        className="flex-1"
                        autoFocus
                      />
                      <Button size="sm" onClick={() => saveEdit(meal.id)}>
                        저장
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelEdit}>
                        취소
                      </Button>
                    </div>
                  ) : (
                    <div
                      className={`cursor-pointer p-2 rounded ${
                        meal.completed ? "text-muted-foreground line-through" : ""
                      }`}
                      onClick={() => startEditing(meal.id, meal.text)}
                    >
                      {meal.text}
                    </div>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMeal(meal.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {meals.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              아직 등록된 식사가 없습니다.
            </div>
          )}

          {/* 통계 */}
          <div className="pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 rounded-lg bg-muted">
                <div className="text-2xl">{meals.filter(m => m.completed).length}</div>
                <div className="text-sm text-muted-foreground">완료</div>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <div className="text-2xl">{meals.length - meals.filter(m => m.completed).length}</div>
                <div className="text-sm text-muted-foreground">남은 식사</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}