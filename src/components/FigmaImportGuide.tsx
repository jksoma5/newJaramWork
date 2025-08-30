import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

export default function FigmaImportGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Figma 디자인 적용하기</h1>
        <p className="text-muted-foreground text-lg">
          Figma에서 만든 디자인을 웹 애플리케이션으로 변환하는 완전한 가이드
        </p>
      </div>

      <div className="grid gap-6">
        {/* 1단계 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Badge variant="default" className="text-lg px-3 py-1">1</Badge>
              <CardTitle>Figma 디자인 준비하기</CardTitle>
            </div>
            <CardDescription>
              먼저 Figma에서 디자인을 완성하고 내보낼 준비를 합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">✅ 체크리스트:</h4>
              <ul className="space-y-2 text-sm">
                <li>• 모든 레이어에 적절한 이름 지정</li>
                <li>• 컴포넌트와 오토레이아웃 적절히 사용</li>
                <li>• 색상과 텍스트 스타일 정리</li>
                <li>• 이미지와 아이콘 최적화</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 2단계 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Badge variant="default" className="text-lg px-3 py-1">2</Badge>
              <CardTitle>Figma Make로 가져오기</CardTitle>
            </div>
            <CardDescription>
              Figma Make에서 디자인을 직접 가져와서 React 코드로 변환합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold mb-2 text-blue-800">📥 가져오기 과정:</h4>
              <ol className="space-y-2 text-sm text-blue-700">
                <li>1. Figma Make에서 "Import from Figma" 선택</li>
                <li>2. Figma 파일 URL 또는 프레임 링크 붙여넣기</li>
                <li>3. 가져올 프레임/컴포넌트 선택</li>
                <li>4. 자동으로 React + Tailwind 코드 생성</li>
              </ol>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold mb-2 text-yellow-800">⚡ 자동 변환 기능:</h4>
              <ul className="space-y-1 text-sm text-yellow-700">
                <li>• Figma 레이어 → React 컴포넌트</li>
                <li>• 스타일 → Tailwind CSS 클래스</li>
                <li>• 이미지 → 최적화된 에셋</li>
                <li>• SVG → React 컴포넌트</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 3단계 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Badge variant="default" className="text-lg px-3 py-1">3</Badge>
              <CardTitle>코드 구조 이해하기</CardTitle>
            </div>
            <CardDescription>
              생성된 코드의 구조를 파악하고 필요에 맞게 수정합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
              <div className="text-gray-600 mb-2">// 생성된 파일 예시</div>
              <div className="space-y-1">
                <div>/components/MyFigmaComponent.tsx</div>
                <div>/imports/svg-icons.ts</div>
                <div className="text-blue-600">import imgAsset from "figma:asset/..."</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <h5 className="font-semibold text-green-800 mb-1">✅ 유지해야 할 것들</h5>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 모든 Tailwind 클래스</li>
                  <li>• style 속성들</li>
                  <li>• 배경 이미지</li>
                  <li>• 레이아웃 구조</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-3 rounded border border-red-200">
                <h5 className="font-semibold text-red-800 mb-1">⚠️ 주의사항</h5>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• 구조 변경 시 신중히</li>
                  <li>• 클래스 삭제 금지</li>
                  <li>• 이미지 경로 보존</li>
                  <li>• SVG 임포트 유지</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4��계 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Badge variant="default" className="text-lg px-3 py-1">4</Badge>
              <CardTitle>상호작용 추가하기</CardTitle>
            </div>
            <CardDescription>
              정적 디자인에 동적 기능과 상호작용을 추가합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-50 p-3 rounded border border-purple-200">
                <h5 className="font-semibold text-purple-800 mb-2">🖱️ 이벤트 핸들링</h5>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• onClick 추가</li>
                  <li>• 폼 처리</li>
                  <li>• 호버 효과</li>
                </ul>
              </div>
              
              <div className="bg-indigo-50 p-3 rounded border border-indigo-200">
                <h5 className="font-semibold text-indigo-800 mb-2">🔄 상태 관리</h5>
                <ul className="text-sm text-indigo-700 space-y-1">
                  <li>• useState 훅</li>
                  <li>• 데이터 바인딩</li>
                  <li>• 조건부 렌더링</li>
                </ul>
              </div>
              
              <div className="bg-teal-50 p-3 rounded border border-teal-200">
                <h5 className="font-semibold text-teal-800 mb-2">🎨 애니메이션</h5>
                <ul className="text-sm text-teal-700 space-y-1">
                  <li>• Motion 컴포넌트</li>
                  <li>• CSS 트랜지션</li>
                  <li>• 스크롤 효과</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5단계 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Badge variant="default" className="text-lg px-3 py-1">5</Badge>
              <CardTitle>최적화 및 배포</CardTitle>
            </div>
            <CardDescription>
              성능 최적화를 진행하고 프로덕션에 배포할 준비를 합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold mb-2 text-orange-800">🚀 최적화 체크리스트:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-orange-700">
                <div>
                  <h5 className="font-semibold mb-1">성능</h5>
                  <ul className="space-y-1">
                    <li>• 이미지 지연 로딩</li>
                    <li>• 코드 분할</li>
                    <li>• 번들 크기 최적화</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-1">접근성</h5>
                  <ul className="space-y-1">
                    <li>• alt 태그 추가</li>
                    <li>• 키보드 내비게이션</li>
                    <li>• 스크린 리더 지원</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* 도움말 섹션 */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💡 추가 도움말
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-semibold mb-2">📚 유용한 리소스:</h5>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Tailwind CSS 문서</li>
                <li>• React 공식 가이드</li>
                <li>• Figma API 문서</li>
                <li>• 웹 접근성 가이드라인</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-2">🛠️ 개발 팁:</h5>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 컴포넌트 단위로 개발</li>
                <li>• 반응형 디자인 고려</li>
                <li>• 브라우저 테스트 필수</li>
                <li>• 버전 관리 활용</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}