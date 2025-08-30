import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus, X, Loader2 } from "lucide-react";

// 3단계에서 만든 클라이언트들을 import 합니다.
import { supabase, geminiModel } from "../lib/api"; 

interface MealItem {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodayMeal() {
  const [meals, setMeals] = useState<MealItem[]>([
    // 초기 데이터는 이제 DB에서 불러오는 것이 좋습니다. (useEffect 사용)
    // 여기서는 간단하게 비워둡니다.
  ]);
  const [newMeal, setNewMeal] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  
  // API 요청 중 로딩 상태를 관리합니다.
  const [isLoading, setIsLoading] = useState(false);

  // Gemini API와 Supabase를 연동한 새로운 addMeal 함수
  const addMeal = async () => {
    if (!newMeal.trim() || isLoading) return;

    setIsLoading(true);
    try {
      // 1. Gemini API에 사용자 입력을 프롬프트로 전달
      const prompt = `다음 요청에 대한 식사 메뉴 딱 한 가지만 추천해줘: "${newMeal}"`;
      const result = await geminiModel.generateContent(prompt);
      const response = await result.response;
      const geminiOutput = response.text().replace(/\"/g, "").trim(); // 불필요한 따옴표 제거

      // 2. Gemini의 응답을 Supabase에 저장
      const { data, error } = await supabase
        .from("meals") // Supabase에 생성한 테이블 이름
        .insert([{ text: geminiOutput, completed: false }])
        .select()
        .single();

      if (error) {
        throw error;
      }
      
      // 3. UI 상태 업데이트
      if (data) {
        setMeals(prevMeals => [...prevMeals, data]);
      }
      setNewMeal("");

    } catch (error) {
      console.error("Error adding meal:", error);
      alert("식사 추가 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- (deleteMeal, toggleMeal 등 나머지 함수들은 기존과 동일) ---
  const deleteMeal = (id: string) => {
    // 실제로는 DB에서 삭제하는 로직 추가 필요
    setMeals(meals.filter(meal => meal.id !== id));
  };
  const toggleMeal = (id: string) => {
    // 실제로는 DB에서 업데이트하는 로직 추가 필요
    setMeals(meals.map(meal => 
      meal.id === id ? { ...meal, completed: !meal.completed } : meal
    ));
  };
  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };
  const saveEdit = (id: string) => {
    // 실제로는 DB에서 업데이트하는 로직 추가 필요
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
          <CardTitle className="text-center">오늘의 식단 (AI 추천)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2">
            <Input
              placeholder="메뉴를 추천받아 보세요! (예: 저녁 뭐 먹지?)"
              value={newMeal}
              onChange={(e) => setNewMeal(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addMeal()}
              disabled={isLoading} // 로딩 중 입력 비활성화
              className="flex-1"
            />
            <Button onClick={addMeal} size="icon" disabled={isLoading}>
              {/* 로딩 중일 때 아이콘 변경 */}
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* --- (나머지 JSX는 기존과 동일) --- */}
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
               AI에게 메뉴를 추천받아 보세요!
             </div>
           )}
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
