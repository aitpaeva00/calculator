import { evaluate } from 'mathjs';

export const toRadians = (angle) => {
  if (isDegrees) {
    return `((${angle}) * pi / 180)`; // mathjs поддерживает pi
  }
  return angle;
};


export const calculate = () => {
  try {
    if (display.includes('/0')) {
      setDisplay('Error');
      return;
    }

    // Преобразуем выражение для обработки
    let formattedExpression = display;

    // Обработка тригонометрических функций
    formattedExpression = formattedExpression
      .replace(/sin\((.*?)\)/g, (_, angle) => `sin(${isDegrees ? `(${angle} * pi / 180)` : angle})`)
      .replace(/cos\((.*?)\)/g, (_, angle) => `cos(${isDegrees ? `(${angle} * pi / 180)` : angle})`)
      .replace(/tan\((.*?)\)/g, (_, angle) => `tan(${isDegrees ? `(${angle} * pi / 180)` : angle})`)
      .replace(/\u221a\((.*?)\)/g, (_, number) => `sqrt(${number})`); // Обработка квадратного корня

    // Используем mathjs для вычисления
    const result = evaluate(formattedExpression);

    // Отображаем результат
    setDisplay(result.toString());
  } catch (error) {
    setDisplay('Error'); // Если что-то пошло не так
  }
};


