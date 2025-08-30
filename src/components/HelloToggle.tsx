import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export default function HelloToggle() {
  const [isHelloFigma, setIsHelloFigma] = useState(false);

  const handleToggle = () => {
    setIsHelloFigma(!isHelloFigma);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl">
              {isHelloFigma ? "Hello Figma!" : "Hello World!"}
            </h1>
            <p className="text-muted-foreground">
              버튼을 클릭하면 텍스트가 변경됩니다
            </p>
          </div>
          
          <Button 
            onClick={handleToggle}
            className="w-full"
            size="lg"
          >
            {isHelloFigma ? "World로 바꾸기" : "Figma로 바꾸기"}
          </Button>
          
          <div className="text-sm text-muted-foreground">
            현재 상태: <strong>{isHelloFigma ? "Figma" : "World"}</strong>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}