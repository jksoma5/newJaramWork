import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Plus, Trash2, Edit, Check, X } from "lucide-react";

interface Deal {
  id: string;
  name: string;
  price: number;
  weight: string;
  store: string;
  discount: number;
  originalPrice: number;
}

export default function HotDeals() {
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: "1",
      name: "국내산 사과",
      price: 12000,
      weight: "3kg",
      store: "마트A",
      discount: 20,
      originalPrice: 15000
    },
    {
      id: "2", 
      name: "삼겹살",
      price: 8500,
      weight: "500g",
      store: "정육점B",
      discount: 15,
      originalPrice: 10000
    },
    {
      id: "3",
      name: "유기농 쌀",
      price: 45000,
      weight: "10kg",
      store: "농협",
      discount: 25,
      originalPrice: 60000
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [newDeal, setNewDeal] = useState({
    name: "",
    price: "",
    weight: "",
    store: "",
    discount: "",
    originalPrice: ""
  });

  const addDeal = () => {
    if (newDeal.name && newDeal.price && newDeal.weight) {
      const price = parseInt(newDeal.price);
      const originalPrice = parseInt(newDeal.originalPrice) || price;
      const discount = parseInt(newDeal.discount) || 0;

      const deal: Deal = {
        id: Date.now().toString(),
        name: newDeal.name,
        price: price,
        weight: newDeal.weight,
        store: newDeal.store || "미정",
        discount: discount,
        originalPrice: originalPrice
      };

      setDeals([...deals, deal]);
      setNewDeal({
        name: "",
        price: "",
        weight: "",
        store: "",
        discount: "",
        originalPrice: ""
      });
    }
  };

  const deleteDeal = (id: string) => {
    setDeals(deals.filter(deal => deal.id !== id));
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString() + "원";
  };

  const getDiscountColor = (discount: number) => {
    if (discount >= 30) return "destructive";
    if (discount >= 20) return "default";
    if (discount >= 10) return "secondary";
    return "outline";
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">핫딜 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 새 딜 추가 폼 */}
          <Card className="p-4 bg-muted/50">
            <h4 className="mb-4">새 핫딜 추가</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-3">
              <Input
                placeholder="상품명"
                value={newDeal.name}
                onChange={(e) => setNewDeal({...newDeal, name: e.target.value})}
              />
              <Input
                placeholder="가격"
                type="number"
                value={newDeal.price}
                onChange={(e) => setNewDeal({...newDeal, price: e.target.value})}
              />
              <Input
                placeholder="중량"
                value={newDeal.weight}
                onChange={(e) => setNewDeal({...newDeal, weight: e.target.value})}
              />
              <Input
                placeholder="판매처"
                value={newDeal.store}
                onChange={(e) => setNewDeal({...newDeal, store: e.target.value})}
              />
              <Input
                placeholder="할인율(%)"
                type="number"
                value={newDeal.discount}
                onChange={(e) => setNewDeal({...newDeal, discount: e.target.value})}
              />
              <Input
                placeholder="원가"
                type="number"
                value={newDeal.originalPrice}
                onChange={(e) => setNewDeal({...newDeal, originalPrice: e.target.value})}
              />
            </div>
            <Button onClick={addDeal} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              핫딜 추가
            </Button>
          </Card>

          {/* 딜 테이블 */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>상품명</TableHead>
                  <TableHead>가격</TableHead>
                  <TableHead>중량</TableHead>
                  <TableHead>단가</TableHead>
                  <TableHead>판매처</TableHead>
                  <TableHead>할인</TableHead>
                  <TableHead>원가</TableHead>
                  <TableHead>작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell>
                      {deal.name}
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatPrice(deal.price)}
                    </TableCell>
                    <TableCell>
                      {deal.weight}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {(() => {
                        const weightNum = parseFloat(deal.weight.replace(/[^0-9.]/g, ""));
                        const unit = deal.weight.replace(/[0-9.]/g, "");
                        if (weightNum) {
                          const unitPrice = Math.round(deal.price / weightNum);
                          return `${unitPrice.toLocaleString()}원/${unit}`;
                        }
                        return "-";
                      })()}
                    </TableCell>
                    <TableCell>
                      {deal.store}
                    </TableCell>
                    <TableCell>
                      {deal.discount > 0 && (
                        <Badge variant={getDiscountColor(deal.discount)}>
                          {deal.discount}% 할인
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {deal.discount > 0 && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(deal.originalPrice)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteDeal(deal.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {deals.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              등록된 핫딜이 없습니다.
            </div>
          )}

          {/* 통계 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl">
                  {deals.length}
                </div>
                <div className="text-sm text-muted-foreground">총 핫딜 수</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl text-green-600">
                  {Math.round(deals.reduce((acc, deal) => acc + deal.discount, 0) / deals.length || 0)}%
                </div>
                <div className="text-sm text-muted-foreground">평균 할인율</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl text-blue-600">
                  {formatPrice(deals.reduce((acc, deal) => acc + (deal.originalPrice - deal.price), 0))}
                </div>
                <div className="text-sm text-muted-foreground">총 절약 금액</div>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}