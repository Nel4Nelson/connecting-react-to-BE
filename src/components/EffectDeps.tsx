import { useEffect, useState } from "react";

interface Props {
    color: string;
}

const EffectDeps = ({color}: Props) => {
  const [category, setCategory] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState('');  

  useEffect(() => {
    setCategory(['Household', 'Clothing']);
    setSelectedColor(color);
  }, [color]);

  return (
    <div className="my-5">
        <h3>You have selected {selectedColor || 'no color yet'}</h3>
        <ul>
            {category.map(category => <li key={category}>{category}</li>)}
        </ul>
    </div>
  )
}

export default EffectDeps