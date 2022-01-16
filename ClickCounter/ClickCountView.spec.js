describe("App.ClickCountView 모듈", () => {
  let udpateEl, clickCounter, view;

  it("ClickCounter를 주입하지 않으면 에러를 던진다", () => {
    const clickCounter = null;
    const updateEl = document.createElement("span");
    const actual = () => App.ClickCountView(clickCounter, updateEl);
    expect(actual).toThrowError(App.ClickCountView.messages.noClickCounter);
  });

  it("updateEl를 주입하지 않으면 에러를 던진다", () => {
    const clickCounter = App.ClickCounter();
    const updateEl = null;
    const actual = () => App.ClickCountView(clickCounter, updateEl);
    expect(actual).toThrowError(App.ClickCountView.messages.noUpdateEl);
  });

  beforeEach(() => {
    updateEl = document.createElement("span");
    clickCounter = App.ClickCounter();
    view = App.ClickCountView(clickCounter, updateEl);
  });

  describe("updateView()", () => {
    it("ClickCounter의 getValue() 실행결과를 출력한다", () => {
      const counterValue = clickCounter.getValue();
      view.updateView();
      expect(updateEl.innerHTML).toBe(counterValue.toString());
    });
  });

  //테스트 더블 : 단위테스트 패턴으로, 테스트하기 곤란한 컴포넌트를 대체하며 테스트하는 것
  //특정한 동학을 흉내만 낼 뿐이지만 테스트 하기에는 적합하다.
  //dummy(더미) : 인자를 채우기 위해 사용
  //sturb(스텁) : 더미를 개선하여 실제 동작하게끔 만드는 것. 리턴값을 하드 코딩한다.
  //spy(스파이) : 스텁과 유사. 내부적으로 기록을 남기는 추가기능.
  //fake(페이크) : 스텁에서 발전한 실제 코드. 운영에서는 사용 불가.
  //mock(목) : 더미, 스텁, 스파이를 혼합한 형태
  describe("increaseAndUpdateView()는", () => {
    it("ClickCounter의 increase 를 실행한다", () => {
      spyOn(clickCounter, "increase");
      view.increaseAndUpdateView();
      expect(clickCounter.increase).toHaveBeenCalled();
    });

    it("updateView를 실행한다", () => {
      spyOn(view, "updateView");
      view.increaseAndUpdateView();
      expect(view.updateView).toHaveBeenCalled();
    });
  });
});
