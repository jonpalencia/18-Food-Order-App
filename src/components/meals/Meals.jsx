import { useEffect, useState } from 'react';
import { MEALS_URL } from '../../utils/config';
import MealItem from './MealItem';

export default function Meals() {
  const [mealsState, setMealsState] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch(`${MEALS_URL}/meals`);
        if (!res.ok) throw new Error(`🚫 ${res.status} - Please try again...`);
        const resData = await res.json();
        setMealsState(resData);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <ul id="meals">
      {mealsState.map(meal => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
