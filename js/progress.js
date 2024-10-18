/**
 * Класс для создания progress блока
 * @class
 * @param {string} idSvg - id svg блока
 * @param {string} idCircle1 - id первого круга
 * @param {string} idCircle2 - id второго круга
 * @param {string} color1 - цвет первого круга
 * @param {string} color2 - цвет второго круга
 * @param {number} [value=0] - значение
 * @param {string} [state="normal"] - состояние progress блока (normal, animated, hidden)
 */
export class Progress {
  constructor(
    idSvg,
    idCircle1,
    idCircle2,
    color1,
    color2,
    value = 0,
    state = "normal"
  ) {
    this.idSvgBlock = idSvg;
    this.idCircle1 = idCircle1;
    this.idCircle2 = idCircle2;
    this.color1 = color1;
    this.color2 = color2;
    this.svgElement = this.createCircleBlock();
    this.timerId = null;
    this.value = value;
    this.state = state;
    this.render();
    this.initialState(state);
  }
  /**
   * Создает svg блок с двумя кругами
   * @returns {Element} - svg блок
   */
  createCircleBlock() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svgContainer = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgContainer.setAttribute("id", this.idSvgBlock);
    svgContainer.setAttribute(
      "style",
      "position: relative;width: 250px;height: 250px;visibility: visible;transform: rotate(-90deg);transition: opacity 0.5s ease-in-out;"
    );

    const circle1 = document.createElementNS(svgNS, "circle");
    circle1.setAttribute("id", this.idCircle1);
    circle1.setAttribute(
      "style",
      `width: 100%;height: 100%;fill: none;stroke: ${this.color1};stroke-width: 10;stroke-linecap: round;transform: translate(5px, 25px);`
    );
    circle1.setAttribute("cx", 100);
    circle1.setAttribute("cy", 100);
    circle1.setAttribute("r", 100);

    const circle2 = document.createElementNS(svgNS, "circle");
    circle2.setAttribute("id", this.idCircle2);
    circle2.setAttribute(
      "style",
      `width: 100%;height: 100%;fill: none;stroke: ${this.color2};stroke-width: 10;stroke-linecap: round;transform: translate(5px, 25px);stroke-dasharray: 628px;stroke-dashoffset: 628px;`
    );
    circle2.setAttribute("class", "animate");
    circle2.setAttribute("cx", 100);
    circle2.setAttribute("cy", 100);
    circle2.setAttribute("r", 100);

    svgContainer.appendChild(circle1);
    svgContainer.appendChild(circle2);

    return svgContainer;
  }
  /**
   * Рендерит svg блок
   */
  render() {
    document.getElementById("circle-container").append(this.svgElement);
  }
  /**
   * Устанавливает начальное состояние progress блока
   * @param {string} state - состояние progress блока (normal, animated, hidden)
   */
  initialState(state) {
    if (state == "normal") {
      this.setValue(this.value);
    }
    if (state == "animated") {
      this.setAnimated(true);
    }
    if (state == "hidden") {
      this.setHidden(true);
    }
  }
  /**
   * Устанавливает значение progress блока
   * @param {number} value - значение
   */
  setValue(value) {
    const circle = document.getElementById(this.idCircle2);
    const offset = 628 - (628 * value) / 100;
    circle.style.strokeDashoffset = offset + "px";
  }
  /**
   * Устанавливает анимацию progress блока
   * @param {boolean} isAnimated - флаг анимации
   */
  setAnimated(isAnimated) {
    let val = 0;
    const self = this;
    const circle = document.getElementById(this.idCircle2);

    function startProgress() {
      self.timerId = setInterval(() => {
        val += 10;

        if (val <= 100) {
          circle.classList.add("animate");
          self.setValue(val);
        } else {
          circle.classList.remove("animate");
          val = 0;
          self.setValue(val);
        }
      }, 150);
    }
    function stopProgress() {
      clearInterval(self.timerId);
      self.setValue(0);
    }

    if (isAnimated) {
      startProgress();
    } else {
      stopProgress();
    }
  }
  /**
   * Устанавливает скрытие progress блока
   * @param {boolean} isHidden - флаг скрытия
   */
  setHidden(isHidden) {
    if (isHidden) {
      this.svgElement.classList.add("hidden");
    } else {
      this.svgElement.classList.remove("hidden");
    }
  }
}
