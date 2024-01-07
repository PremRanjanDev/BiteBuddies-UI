import { MdLocationPin } from "react-icons/md";
import { SessionRestaurant } from "../services/session-service";

const ResturantCard = function ({
  restaurant,
  sessionId,
  submittedByUserId,
}: SessionRestaurant) {
  return (
    <aside className="h-40 py-2 px-3 rounded-lg border border-solid border-orange-600 shadow-lg flex-grow-0 flex-shrink-0 flex-[288px] my-2">
      <h4>Resturant name</h4>
      <div className="image-container w-full h-20 flex justify-center">
        <img
          src={restaurant.imageUrl ? restaurant.imageUrl : "/default-image.svg"}
          alt="default"
          className="h-full"
        />
      </div>
      <div className="flex gap-2">
        <MdLocationPin
          className="text-orange-600 inline-block flex-grow-[2]"
          style={{
            fontSize: "2rem",
          }}
        />
        <p className="inline-block text-sm">
          Address Lorem ipsum dolor sit amet.
        </p>
      </div>
    </aside>
  );
};

export default ResturantCard;
