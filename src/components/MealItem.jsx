import { MEALS_URL } from '../utils/config';

export default function MealItem({ mealsState }) {
  // TODO: Next tass is to export this list of meals to another component to make it more modular.

  const mealCards = mealsState.map(meal => {
    const { description, id, image, name, price } = meal;
    return (
      <li className="meal-item" key={id}>
        <img src={`${MEALS_URL}/${image}`} alt={name} />
        <h3>{name}</h3>
        <article>{description}</article>
      </li>
    );
  });

  return mealCards;
}
