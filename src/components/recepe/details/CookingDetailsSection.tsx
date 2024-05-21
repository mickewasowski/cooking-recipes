import { FaHeart, FaClock, FaUtensils } from 'react-icons/fa';


const CookingDetailsSection = () => {

  return (
    <div>
      {/* Favorites */}
      <div textAlign="center">
        {/* <Icon as={FaHeart} boxSize={6} />
        <Text mt={2}>Likes</Text> */}
      </div>

      {/* Cooking Time */}
      <div>
        {/* <Icon as={FaClock} boxSize={6} />
        <Text mt={2}>Cooking time 25min</Text> */}
      </div>

      {/* Portions */}
      <div>
        {/* <Icon as={FaUtensils} boxSize={6} />
        <Text mt={2}>Portions 10</Text> */}
      </div>
    </div>
  );
};

export default CookingDetailsSection;
