import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton = ({ count }) => {
  return (
    <div>
      <h1>
        <Skeleton />
      </h1>
      <Skeleton count={count} />
    </div>
  );
};

export default LoadingSkeleton;
