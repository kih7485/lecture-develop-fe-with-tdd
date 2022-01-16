var App = App || {};
App.ClickCountView = (clickCounter, updateEl) => {
  if (!clickCounter) throw Error("clickCounter");
  return {
    updateView() {
      updateEl.innerHTML = clickCounter.getValue();
    },
  };
};
