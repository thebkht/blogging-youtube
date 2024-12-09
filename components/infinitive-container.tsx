import { useInView } from "react-intersection-observer";

interface InfinitiveContainerProps
  extends React.PropsWithChildren {
  onIntersect: () => void;
  className?: string;
}

export function InfinitiveContainer({
  onIntersect,
  ...props
}: InfinitiveContainerProps & React.ComponentPropsWithoutRef<"div">) {
  const { ref } = useInView({
    rootMargin: "200px",
    onChange(inView) {
      if (inView) {
        onIntersect();
      }
    },
  });

  return (
    <div {...props}>
     {props.children}
      <div ref={ref} />
    </div>
  );
}
