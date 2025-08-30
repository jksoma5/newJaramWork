import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { Plus, Trash2, RefreshCw } from "lucide-react";
import { apiClient, FoodItem } from "../utils/api";
import { toast } from "sonner";

export default function LeftoverFood() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [newFoodName, setNewFoodName] = useState("");
  const [newFoodDescription, setNewFoodDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  // 데이터 로드
  const loadFoods = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getLeftoverFoods();
      setFoods(data);
      console.log("Loaded foods:", data);
    } catch (error) {
      console.error("Error loading foods:", error);
      toast.error("음식 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    loadFoods();
  }, []);

  const addFood = async () => {
    if (!newFoodName.trim()) return;

    try {
      setLoading(true);
      const newFood = await apiClient.createLeftoverFood({
        name: newFoodName.trim(),
        level: 50,
        description: newFoodDescription.trim() || "",
      });
      
      setFoods([...foods, newFood]);
      setNewFoodName("");
      setNewFoodDescription("");
      toast.success("음식이 추가되었습니다!");
      console.log("Added food:", newFood);
    } catch (error) {
      console.error("Error adding food:", error);
      toast.error("음식 추가에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const deleteFood = async (id: string) => {
    try {
      await apiClient.deleteLeftoverFood(id);
      setFoods(foods.filter(food => food.id !== id));
      toast.success("음식이 삭제되었습니다!");
      console.log("Deleted food with id:", id);
    } catch (error) {
      console.error("Error deleting food:", error);
      toast.error("음식 삭제에 실패했습니다.");
    }
  };

  const updateLevel = async (id: string, newLevel: number[]) => {
    try {
      setUpdating(id);
      // 로컬 상태 즉시 업데이트 (UX 향상)
      setFoods(foods.map(food => 
        food.id === id ? { ...food, level: newLevel[0] } : food
      ));

      const updatedFood = await apiClient.updateLeftoverFood(id, { level: newLevel[0] });
      console.log("Updated food level:", updatedFood);
    } catch (error) {
      console.error("Error updating food level:", error);
      toast.error("레벨 업데이트에 실패했습니다.");
      // 에러 시 데이터 다시 로드
      await loadFoods();
    } finally {
      setUpdating(null);
    }
  };

  const getLevelColor = (level: number) => {
    if (level <= 20) return "bg-red-500";
    if (level <= 40) return "bg-orange-500";
    if (level <= 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getLevelText = (level: number) => {
    if (level <= 20) return "부족";
    if (level <= 40) return "조금";
    if (level <= 60) return "보통";
    return "충분";
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-center flex-1">남은 음식 관리</CardTitle>
            <Button
              variant="outline"
              size="icon"
              onClick={loadFoods}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading && foods.length === 0 && (
            <div className="text-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
              <div className="text-muted-foreground">음식 목록을 불러오는 중...</div>
            </div>
          )}
          {/* 새 음식 추가 */}
          <Card className="p-4 bg-muted/50">
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="음식 이름"
                  value={newFoodName}
                  onChange={(e) => setNewFoodName(e.target.value)}
                />
                <Input
                  placeholder="설명 (선택사항)"
                  value={newFoodDescription}
                  onChange={(e) => setNewFoodDescription(e.target.value)}
                />
              </div>
              <Button onClick={addFood} className="w-full" disabled={loading}>
                <Plus className="h-4 w-4 mr-2" />
                {loading ? "처리 중..." : "음식 추가"}
              </Button>
            </div>
          </Card>

          {/* 음식 목록 */}
          <div className="space-y-4">
            {foods.map((food) => (
              <Card key={food.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="flex items-center gap-2">
                        {food.name}
                        <Badge variant={food.level <= 20 ? "destructive" : "secondary"}>
                          {getLevelText(food.level)}
                        </Badge>
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {food.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteFood(food.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* 레벨 슬라이더 */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>보관량 레벨</span>
                      <span>{food.level}/60</span>
                    </div>
                    <Slider
                      value={[food.level]}
                      onValueChange={(value) => updateLevel(food.id, value)}
                      max={60}
                      step={1}
                      className="w-full"
                      disabled={updating === food.id}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>부족</span>
                      <span>조금</span>
                      <span>보통</span>
                      <span>충분</span>
                    </div>
                  </div>

                  {/* 시각적 레벨 표시 */}
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${getLevelColor(food.level)}`}
                      style={{ width: `${(food.level / 60) * 100}%` }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {foods.length === 0 && !loading && (
            <div className="text-center text-muted-foreground py-8">
              등록된 남은 음식이 없습니다.
            </div>
          )}

          {loading && foods.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              데이터를 불러오고 있습니다...
            </div>
          )}

          {/* 통계 요약 */}
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
            <h4 className="mb-3">보관 현황</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center">
                <div className="text-red-600">
                  {foods.filter(f => f.level <= 20).length}
                </div>
                <div className="text-xs text-muted-foreground">부족</div>
              </div>
              <div className="text-center">
                <div className="text-orange-600">
                  {foods.filter(f => f.level > 20 && f.level <= 40).length}
                </div>
                <div className="text-xs text-muted-foreground">조금</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-600">
                  {foods.filter(f => f.level > 40 && f.level <= 60).length}
                </div>
                <div className="text-xs text-muted-foreground">충분</div>
              </div>
              <div className="text-center">
                <div>
                  {foods.length}
                </div>
                <div className="text-xs text-muted-foreground">전체</div>
              </div>
            </div>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}