import MealItem from './MealItem';
import { MEALS_URL, defaultObj } from '../../utils/config';
import useHttp from '../../hooks/useHttp';

export default function Meals() {
  const { data: mealsState } = useHttp(
    `${MEALS_URL}/meals`,
    defaultObj.method,
    defaultObj.initData,
  );

  return (
    <ul id="meals">
      {mealsState.map(meal => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
