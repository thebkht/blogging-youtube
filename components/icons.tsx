type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  logo: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.8367 17.0565L10.2857 12.8076C10.4451 12.5311 10.2451 12.185 9.92558 12.185H5.02992C4.88149 12.185 4.744 12.1061 4.66979 11.9772L2.05596 7.44092C1.8966 7.16438 2.09658 6.81832 2.41609 6.81832H7.54297C7.6914 6.81832 7.82889 6.73942 7.9031 6.61053L10.4412 2.20779C10.5154 2.0789 10.6529 2 10.8013 2H21.5839C21.9034 2 22.1034 2.34606 21.944 2.6226L19.545 6.78473C19.4708 6.91363 19.3333 6.99253 19.1849 6.99253H8.696C8.37728 6.99253 8.17729 7.33703 8.33509 7.61356L10.7255 11.8007C10.7997 11.9304 10.9372 12.01 11.0864 12.01H15.8118C16.1313 12.01 16.3313 12.3561 16.1719 12.6326L10.97 21.6584C10.8099 21.9357 10.4099 21.9357 10.2505 21.6584L7.8367 17.4705C7.76249 17.3432 7.76249 17.1846 7.8367 17.0565Z"
        fill="currentColor"
      />
    </svg>
  ),
  home: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21 21V8L12 2L3 8V21H9V13H15V21H21Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  ),
  homeActive: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 7.46482L12 0.798157L2 7.46482V22H10V14H14V22H22V7.46482Z"
        fill="currentColor"
      />
    </svg>
  ),
  explore: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21 11.9998C21 16.9704 16.9706 20.9998 12 20.9998C7.02944 20.9998 3 16.9704 3 11.9998C3 7.02925 7.02944 2.99982 12 2.99982C16.9706 2.99982 21 7.02925 21 11.9998Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M14.8284 9.17138L9.99998 9.99981L9.17156 14.8282L14 13.9998L14.8284 9.17138Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  ),
  exploreActive: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 11.9998C2 6.47697 6.47715 1.99982 12 1.99982C17.5228 1.99982 22 6.47697 22 11.9998C22 17.5227 17.5228 21.9998 12 21.9998C6.47715 21.9998 2 17.5227 2 11.9998ZM15.4412 8.55841L14.4334 14.4322L8.55957 15.44L9.56735 9.5662L15.4412 8.55841Z"
        fill="currentColor"
      />
    </svg>
  ),
  notifications: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2C7.938 2 4.506 5.021 3.997 9.051L2.866 18H7.1C7.563 20.282 9.581 22 12 22C14.419 22 16.437 20.282 16.9 18H21.136L19.993 9.042ZM12 20C10.694 20 9.583 19.165 9.171 18H14.829C14.417 19.165 13.306 20 12 20ZM5.134 16L5.981 9.302C6.364 6.272 8.941 4 11.996 4C15.051 4 17.623 6.268 18.009 9.295L18.864 16H5.134Z"
        fill="currentColor"
      />
    </svg>
  ),
  notificationsActive: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.996 2C7.934 2 4.506 5.021 3.997 9.051L2.866 18H7.1C7.563 20.282 9.581 22 12 22C14.419 22 16.437 20.282 16.9 18H21.136L19.993 9.042C19.48 5.017 16.054 2 11.996 2ZM9.171 18H14.829C14.417 19.165 13.306 20 12 20C10.694 20 9.583 19.165 9.171 18Z"
        fill="currentColor"
      />
    </svg>
  ),
  bookmarks: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 3H19V21L12 16L5 21V3Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  ),
  bookmarksActive: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M4 2H20V22.5714L12 16.8571L4 22.5714V2Z" fill="currentColor" />
    </svg>
  ),
};
