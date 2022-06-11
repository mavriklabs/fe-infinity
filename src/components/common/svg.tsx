import React from 'react';

// NOTE: see the sandbox page for previews

export class SVG {
  static spinner = ({ ...props }) => (
    <svg viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  );

  static arrowImage = ({ ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008"
        stroke="#292D32"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );

  static connectImage = ({ ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        opacity="0.8"
        d="M12.8992 2.52009L12.8692 2.59009L9.96922 9.32009H7.11922C6.43922 9.32009 5.79922 9.45009 5.19922 9.71009L6.94922 5.53009L6.98922 5.44009L7.04922 5.28009C7.07922 5.21009 7.09922 5.15009 7.12922 5.10009C8.43922 2.07009 9.91922 1.38009 12.8992 2.52009Z"
        fill="#000"
      ></path>
      <path
        d="M18.2907 9.52002C17.8407 9.39002 17.3707 9.32002 16.8807 9.32002H9.9707L12.8707 2.59002L12.9007 2.52002C13.0407 2.57002 13.1907 2.64002 13.3407 2.69002L15.5507 3.62002C16.7807 4.13002 17.6407 4.66002 18.1707 5.30002C18.2607 5.42002 18.3407 5.53002 18.4207 5.66002C18.5107 5.80002 18.5807 5.94002 18.6207 6.09002C18.6607 6.18002 18.6907 6.26002 18.7107 6.35002C18.9707 7.20002 18.8107 8.23002 18.2907 9.52002Z"
        fill="#000"
      ></path>
      <path
        opacity="0.4"
        d="M21.7602 14.1998V16.1498C21.7602 16.3498 21.7502 16.5498 21.7402 16.7398C21.5502 20.2398 19.6002 21.9998 15.9002 21.9998H8.10023C7.85023 21.9998 7.62023 21.9798 7.39023 21.9498C4.21023 21.7398 2.51023 20.0398 2.29023 16.8598C2.26023 16.6198 2.24023 16.3898 2.24023 16.1498V14.1998C2.24023 12.1898 3.46023 10.4598 5.20023 9.70982C5.80023 9.44982 6.44023 9.31982 7.12023 9.31982H16.8802C17.3702 9.31982 17.8402 9.38982 18.2902 9.51982C20.2902 10.1298 21.7602 11.9898 21.7602 14.1998Z"
        fill="#000"
      ></path>
      <path
        opacity="0.6"
        d="M6.95023 5.52979L5.20023 9.70978C3.46023 10.4598 2.24023 12.1898 2.24023 14.1998V11.2698C2.24023 8.42979 4.26023 6.05979 6.95023 5.52979Z"
        fill="#000"
      ></path>
      <path
        opacity="0.6"
        d="M21.7591 11.2698V14.1998C21.7591 11.9898 20.2891 10.1298 18.2891 9.51984C18.8091 8.22984 18.9691 7.19984 18.7091 6.34984C18.6891 6.25984 18.6591 6.17984 18.6191 6.08984C20.4891 7.05984 21.7591 9.02984 21.7591 11.2698Z"
        fill="#000"
      ></path>
    </svg>
  );

  static remove = ({ ...props }) => (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M15 11H5V9H15V11ZM10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0Z"
        fill="#F0F0F0"
      />
    </svg>
  );

  static blueCheck = ({ ...props }) => (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_1_1899)">
        <path
          d="M17.7402 8.36001L16.7402 7.36001C16.5424 7.1602 16.394 6.91675 16.3071 6.64932C16.2203 6.38188 16.1975 6.09788 16.2402 5.81997L16.4302 4.44985C16.4538 4.21789 16.3882 3.98558 16.2471 3.79995C16.106 3.61432 15.8997 3.4892 15.6699 3.44985L14.29 3.20986C14.0059 3.15789 13.7377 3.04042 13.5068 2.86685C13.276 2.69327 13.0888 2.46837 12.96 2.20986L12.2998 0.989892C12.175 0.786033 11.9814 0.633583 11.7539 0.560205C11.5264 0.486827 11.2804 0.497472 11.0601 0.58999L9.7998 1.19985C9.544 1.32304 9.2639 1.38711 8.97998 1.38711C8.69606 1.38711 8.41596 1.32304 8.16016 1.19985L6.8999 0.58999C6.67952 0.497472 6.43353 0.486827 6.20605 0.560205C5.97858 0.633583 5.78493 0.786033 5.66016 0.989892L5 2.20986C4.87117 2.46837 4.68398 2.69327 4.45312 2.86685C4.22227 3.04042 3.95403 3.15789 3.66992 3.20986L2.29004 3.44985C2.06022 3.4892 1.85397 3.61432 1.71289 3.79995C1.57181 3.98558 1.50617 4.21789 1.52979 4.44985L1.72021 5.81997C1.76294 6.09788 1.73966 6.38188 1.65283 6.64932C1.566 6.91675 1.41805 7.1602 1.22021 7.36001L0.220215 8.36001C0.0516677 8.53038 -0.0429688 8.76025 -0.0429688 8.9999C-0.0429688 9.23955 0.0516677 9.46943 0.220215 9.63979L1.22021 10.6398C1.41805 10.8396 1.566 11.0831 1.65283 11.3505C1.73966 11.6179 1.76294 11.9019 1.72021 12.1798L1.52979 13.55C1.50617 13.7819 1.57181 14.0142 1.71289 14.1999C1.85397 14.3855 2.06022 14.5106 2.29004 14.55L3.66992 14.7899C3.95403 14.8419 4.22227 14.9594 4.45312 15.133C4.68398 15.3065 4.87117 15.5314 5 15.7899L5.66016 17.0099C5.78493 17.2138 5.97858 17.3662 6.20605 17.4396C6.43353 17.513 6.67952 17.5023 6.8999 17.4098L8.16016 16.8C8.41596 16.6768 8.69606 16.6127 8.97998 16.6127C9.2639 16.6127 9.544 16.6768 9.7998 16.8L11.0601 17.4098C11.2804 17.5023 11.5264 17.513 11.7539 17.4396C11.9814 17.3662 12.175 17.2138 12.2998 17.0099L12.96 15.7899C13.0888 15.5314 13.276 15.3065 13.5068 15.133C13.7377 14.9594 14.0059 14.8419 14.29 14.7899L15.6699 14.55C15.8997 14.5106 16.106 14.3855 16.2471 14.1999C16.3882 14.0142 16.4538 13.7819 16.4302 13.55L16.2402 12.1798C16.1975 11.9019 16.2203 11.6179 16.3071 11.3505C16.394 11.0831 16.5424 10.8396 16.7402 10.6398L17.7402 9.63979C17.9088 9.46943 18.0029 9.23955 18.0029 8.9999C18.0029 8.76025 17.9088 8.53038 17.7402 8.36001ZM8.0498 12.56L4.68994 9.19985L5.75 8.13979L8.0498 10.4398L12.4702 6.01992L13.5298 7.07998L8.0498 12.56Z"
          fill="#0000FF"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_1899">
          <rect width="18" height="17" fill="white" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>
  );

  static grayDelete = ({ ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle fill="#ddd" cx="12" cy="12" r="12" />

      <rect fill="black" x="6" y="11" width="12" height="2" />
    </svg>
  );

  static editCircle = ({ ...props }) => (
    <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id="myMask">
        <circle fill="white" cx="5" cy="5" r="5" />

        <path
          transform="scale(.5) translate(5,5)"
          d="M9.355 2.21559C9.55 2.02059 9.55 1.69559 9.355 1.51059L8.185 0.340586C8 0.145586 7.675 0.145586 7.48 0.340586L6.56 1.25559L8.435 3.13059L9.355 2.21559ZM0.5 7.32059V9.19559H2.375L7.905 3.66059L6.03 1.78559L0.5 7.32059Z"
          fill="black"
        />
      </mask>

      <circle fill="currentColor" cx="5" cy="5" r="5" mask="url(#myMask)" />
    </svg>
  );

  static miniLogo = ({ ...props }) => (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 60" {...props}>
      <path
        d="M48.288 60H13.356C5.96 60 0 54.2 0 47V13C0 5.8 5.959 0 13.356 0h34.932c7.397 0 13.356 5.8 13.356 13v34c0 7.2-5.96 13-13.356 13Z"
        fill="#000"
      />
      <path
        d="M41.08 19.88c-8.976 0-10.258 9.375-10.258 9.375S29.54 19.88 20.564 19.88c-2.72 0-5.33 1.053-7.253 2.929a9.875 9.875 0 0 0-3.004 7.071 9.874 9.874 0 0 0 3.004 7.071 10.393 10.393 0 0 0 7.253 2.93c8.976 0 10.258-9.376 10.258-9.376s1.282 9.375 10.257 9.375c2.72 0 5.33-1.054 7.253-2.929a9.874 9.874 0 0 0 3.005-7.07 9.875 9.875 0 0 0-3.005-7.072 10.393 10.393 0 0 0-7.253-2.929Z"
        fill="#fff"
      />
    </svg>
  );

  static miniLogoDark = ({ ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 228 160" {...props}>
      <rect x="30" y="30" fill="white" width="168" height="100" />
      <path
        d="M148,47c-29,0-34,31-34,31s-4-31-33-31c-19,0-34,15-34,33s14,33,33,33c29,0,34-31,34-31s4,31,33,31c19,0,34-15,34-33
      S167,47,148,47z"
      />
    </svg>
  );

  static logo = ({ ...props }) => (
    <svg viewBox="0 0 208 50" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M108.756 27.137V38.17H104.3v-9.802c0-4.611-1.65-5.755-3.895-5.755-2.575 0-3.895 2.305-3.895 5.755v9.802h-4.456V19.146h4.456v4.61a6.86 6.86 0 0 1 2.242-3.61 6.473 6.473 0 0 1 3.881-1.513c2.79-.136 6.123 1.588 6.123 8.504ZM158.336 27.137V38.17h-4.456v-9.802c0-4.611-1.651-5.755-3.895-5.755-2.592 0-3.912 2.305-3.912 5.755v9.802h-4.456V19.146h4.456v4.61a6.858 6.858 0 0 1 2.249-3.614 6.473 6.473 0 0 1 3.891-1.509c2.773-.136 6.123 1.588 6.123 8.504ZM114.911 16.755c0-3.518 1.651-5.123 4.952-5.123h3.895v4.064h-4.457v3.415h4.457v4.03h-4.457V38.17h-4.39V23.193H111v-4.047h3.911v-2.391ZM177.266 23.107h-3.895V19.06h3.895v-5.123h4.456v5.123h4.457v4.03h-4.457v10.947h4.457v4.132h-3.895c-3.4 0-4.952-1.708-4.952-5.208l-.066-9.854ZM133.117 16.191c1.386 0 2.509-1.162 2.509-2.595 0-1.434-1.123-2.596-2.509-2.596-1.385 0-2.509 1.162-2.509 2.596 0 1.433 1.124 2.595 2.509 2.595ZM138.828 34.054l-3.334.017V19.06h-8.351v4.047h3.895v10.946h-3.895v4.03h11.685v-4.03ZM88.703 34.053l-6.124.018V15.61h6.124v-4.03H72v4.03h6.123v18.442L72 34.036v4.03l16.703.018v-4.03ZM167.101 16.191c1.385 0 2.508-1.162 2.508-2.595 0-1.434-1.123-2.596-2.508-2.596-1.386 0-2.509 1.162-2.509 2.596 0 1.433 1.123 2.595 2.509 2.595ZM172.811 34.054l-3.35.017V19.06h-8.352v4.047h3.895v10.946h-3.895v4.03h11.702v-4.03Z"
        fill="#010101"
      />
      <path
        d="m202.899 19.06-4.951 13.27-4.457-13.27h-4.951l7.246 18.444-1.37 2.817c-.09.193-.23.357-.405.471a1.082 1.082 0 0 1-.586.178h-4.324V45h3.301c3.301 0 4.456 0 6.14-4.03l9.457-21.91h-5.1ZM39.167 50H10.833C4.833 50 0 45.167 0 39.167V10.833C0 4.833 4.833 0 10.833 0h28.334C45.167 0 50 4.833 50 10.833v28.334C50 45.167 45.167 50 39.167 50Z"
        fill="#000"
      />
      <path
        d="M33.32 16.567c-7.28 0-8.32 7.812-8.32 7.812s-1.04-7.812-8.32-7.812a8.313 8.313 0 0 0-5.883 2.44 8.34 8.34 0 0 0 0 11.786 8.314 8.314 0 0 0 5.883 2.44c7.28 0 8.32-7.812 8.32-7.812s1.04 7.813 8.32 7.813a8.313 8.313 0 0 0 5.883-2.441 8.34 8.34 0 0 0 0-11.785 8.313 8.313 0 0 0-5.883-2.441Z"
        fill="#fff"
      />
    </svg>
  );

  static uniswap = ({ ...props }) => {
    return (
      <svg
        id="prefix__Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x={0}
        y={0}
        viewBox="0 0 168.3 193.8"
        xmlSpace="preserve"
        {...props}
      >
        <path
          className="fill-current"
          d="M66 44.1c-2.1-.3-2.2-.4-1.2-.5 1.9-.3 6.3.1 9.4.8 7.2 1.7 13.7 6.1 20.6 13.8l1.8 2.1 2.6-.4c11.1-1.8 22.5-.4 32 4 2.6 1.2 6.7 3.6 7.2 4.2.2.2.5 1.5.7 2.8.7 4.7.4 8.2-1.1 10.9-.8 1.5-.8 1.9-.3 3.2.4 1 1.6 1.7 2.7 1.7 2.4 0 4.9-3.8 6.1-9.1l.5-2.1.9 1c5.1 5.7 9.1 13.6 9.7 19.2l.2 1.5-.9-1.3c-1.5-2.3-2.9-3.8-4.8-5.1-3.4-2.3-7-3-16.5-3.5-8.6-.5-13.5-1.2-18.3-2.8-8.2-2.7-12.4-6.2-22.1-19.1-4.3-5.7-7-8.8-9.7-11.4-5.9-5.7-11.8-8.7-19.5-9.9z"
        />
        <path
          className="fill-current"
          d="M140.5 56.8c.2-3.8.7-6.3 1.8-8.6.4-.9.8-1.7.9-1.7.1 0-.1.7-.4 1.5-.8 2.2-.9 5.3-.4 8.8.7 4.5 1 5.1 5.8 10 2.2 2.3 4.8 5.2 5.8 6.4l1.7 2.2-1.7-1.6c-2.1-2-6.9-5.8-8-6.3-.7-.4-.8-.4-1.3.1-.4.4-.5 1-.5 3.9-.1 4.5-.7 7.3-2.2 10.2-.8 1.5-.9 1.2-.2-.5.5-1.3.6-1.9.6-6.2 0-8.7-1-10.8-7.1-14.3-1.5-.9-4.1-2.2-5.6-2.9-1.6-.7-2.8-1.3-2.7-1.3.2-.2 6.1 1.5 8.4 2.5 3.5 1.4 4.1 1.5 4.5 1.4.3-.3.5-1.1.6-3.6zM70.1 71.7c-4.2-5.8-6.9-14.8-6.3-21.5l.2-2.1 1 .2c1.8.3 4.9 1.5 6.4 2.4 4 2.4 5.8 5.7 7.5 13.9.5 2.4 1.2 5.2 1.5 6.1.5 1.5 2.4 5 4 7.2 1.1 1.6.4 2.4-2.1 2.2-3.8-.4-8.9-3.9-12.2-8.4zM135.4 115.2c-19.8-8-26.8-14.9-26.8-26.6 0-1.7.1-3.1.1-3.1.1 0 .8.6 1.7 1.3 4 3.2 8.5 4.6 21 6.4 7.3 1.1 11.5 1.9 15.3 3.2 12.1 4 19.6 12.2 21.4 23.3.5 3.2.2 9.3-.6 12.5-.7 2.5-2.7 7.1-3.2 7.2-.1 0-.3-.5-.3-1.3-.2-4.2-2.3-8.2-5.8-11.3-4.2-3.6-9.6-6.3-22.8-11.6zM121.4 118.5c-.2-1.5-.7-3.4-1-4.2l-.5-1.5.9 1.1c1.3 1.5 2.3 3.3 3.2 5.8.7 1.9.7 2.5.7 5.6 0 3-.1 3.7-.7 5.4-1 2.7-2.2 4.6-4.2 6.7-3.6 3.7-8.3 5.7-15 6.6-1.2.1-4.6.4-7.6.6-7.5.4-12.5 1.2-17 2.8-.6.2-1.2.4-1.3.3-.2-.2 2.9-2 5.4-3.2 3.5-1.7 7.1-2.6 15-4 3.9-.6 7.9-1.4 8.9-1.8 9.9-3.1 14.8-10.8 13.2-20.2z"
        />
        <path
          className="fill-current"
          d="M130.5 134.6c-2.6-5.7-3.2-11.1-1.8-16.2.2-.5.4-1 .6-1 .2 0 .8.3 1.4.7 1.2.8 3.7 2.2 10.1 5.7 8.1 4.4 12.7 7.8 15.9 11.7 2.8 3.4 4.5 7.3 5.3 12.1.5 2.7.2 9.2-.5 11.9-2.2 8.5-7.2 15.3-14.5 19.2-1.1.6-2 1-2.1 1-.1 0 .3-1 .9-2.2 2.4-5.1 2.7-10 .9-15.5-1.1-3.4-3.4-7.5-8-14.4-5.5-8-6.8-10.1-8.2-13zM56 165.2c7.4-6.2 16.5-10.6 24.9-12 3.6-.6 9.6-.4 12.9.5 5.3 1.4 10.1 4.4 12.6 8.1 2.4 3.6 3.5 6.7 4.6 13.6.4 2.7.9 5.5 1 6.1.8 3.6 2.4 6.4 4.4 7.9 3.1 2.3 8.5 2.4 13.8.4.9-.3 1.7-.6 1.7-.5.2.2-2.5 2-4.3 2.9-2.5 1.3-4.5 1.7-7.2 1.7-4.8 0-8.9-2.5-12.2-7.5-.7-1-2.1-3.9-3.3-6.6-3.5-8.1-5.3-10.5-9.4-13.2-3.6-2.3-8.2-2.8-11.7-1.1-4.6 2.2-5.8 8.1-2.6 11.7 1.3 1.5 3.7 2.7 5.7 3 3.7.5 6.9-2.4 6.9-6.1 0-2.4-.9-3.8-3.3-4.9-3.2-1.4-6.7.2-6.6 3.3 0 1.3.6 2.1 1.9 2.7.8.4.8.4.2.3-2.9-.6-3.6-4.2-1.3-6.5 2.8-2.8 8.7-1.6 10.7 2.3.8 1.6.9 4.8.2 6.8-1.7 4.4-6.5 6.7-11.4 5.4-3.3-.9-4.7-1.8-8.7-5.9-7-7.2-9.7-8.6-19.7-10.1l-1.9-.3 2.1-2z"
        />
        <path
          className="fill-current"
          d="M3.4 4.3c23.3 28.3 59.2 72.3 61 74.7 1.5 2 .9 3.9-1.6 5.3-1.4.8-4.3 1.6-5.7 1.6-1.6 0-3.5-.8-4.8-2.1-.9-.9-4.8-6.6-13.6-20.3C32 53 26.3 44.3 26.2 44.2c-.4-.2-.4-.2 11.8 21.6C45.7 79.5 48.2 84.4 48.2 85c0 1.3-.4 2-2 3.8-2.7 3-3.9 6.4-4.8 13.5-1 7.9-3.7 13.5-11.4 23-4.5 5.6-5.2 6.6-6.3 8.9-1.4 2.8-1.8 4.4-2 8-.2 3.8.2 6.2 1.3 9.8 1 3.2 2.1 5.3 4.8 9.4 2.3 3.6 3.7 6.3 3.7 7.3 0 .8.2.8 3.8 0 8.6-2 15.7-5.4 19.6-9.6 2.4-2.6 3-4 3-7.6 0-2.3-.1-2.8-.7-4.2-1-2.2-2.9-4-7-6.8-5.4-3.7-7.7-6.7-8.3-10.7-.5-3.4.1-5.7 3.1-12 3.1-6.5 3.9-9.2 4.4-15.8.3-4.2.8-5.9 2-7.2 1.3-1.4 2.4-1.9 5.5-2.3 5.1-.7 8.4-2 11-4.5 2.3-2.1 3.3-4.2 3.4-7.3l.1-2.3-1.3-1.4C65.4 71.6.3 0 0 0c-.1 0 1.5 1.9 3.4 4.3zm30.7 142.2c1.1-1.9.5-4.3-1.3-5.5-1.7-1.1-4.3-.6-4.3.9 0 .4.2.8.8 1 .9.5 1 1 .3 2.1s-.7 2.1.2 2.8c1.4 1.1 3.3.5 4.3-1.3zM74.6 93.9c-2.4.7-4.7 3.3-5.4 5.9-.4 1.6-.2 4.5.5 5.4 1.1 1.4 2.1 1.8 4.9 1.8 5.5 0 10.2-2.4 10.7-5.3.5-2.4-1.6-5.7-4.5-7.2-1.5-.8-4.6-1.1-6.2-.6zm6.4 5c.8-1.2.5-2.5-1-3.4-2.7-1.7-6.8-.3-6.8 2.3 0 1.3 2.1 2.7 4.1 2.7 1.3 0 3.1-.8 3.7-1.6z"
        />
      </svg>
    );
  };

  static ethereum = ({ ...props }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
        <g fill="none" fillRule="evenodd">
          <circle cx={16} cy={16} r={16} fill="#627EEA" />
          <g fill="#FFF" fillRule="nonzero">
            <path fillOpacity={0.602} d="M16.498 4v8.87l7.497 3.35z" />
            <path d="M16.498 4L9 16.22l7.498-3.35z" />
            <path fillOpacity={0.602} d="M16.498 21.968v6.027L24 17.616z" />
            <path d="M16.498 27.995v-6.028L9 17.616z" />
            <path fillOpacity={0.2} d="M16.498 20.573l7.497-4.353-7.497-3.348z" />
            <path fillOpacity={0.602} d="M9 16.22l7.498 4.353v-7.701z" />
          </g>
        </g>
      </svg>
    );
  };

  static matic = ({ ...props }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.4 33.5" {...props}>
        <path
          d="M29 10.2c-.7-.4-1.6-.4-2.4 0L21 13.5l-3.8 2.1-5.5 3.3c-.7.4-1.6.4-2.4 0L5 16.3c-.7-.4-1.2-1.2-1.2-2.1v-5c0-.8.4-1.6 1.2-2.1l4.3-2.5c.7-.4 1.6-.4 2.4 0L16 7.2c.7.4 1.2 1.2 1.2 2.1v3.3l3.8-2.2V7c0-.8-.4-1.6-1.2-2.1l-8-4.7c-.7-.4-1.6-.4-2.4 0L1.2 5C.4 5.4 0 6.2 0 7v9.4c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l5.5-3.2 3.8-2.2 5.5-3.2c.7-.4 1.6-.4 2.4 0l4.3 2.5c.7.4 1.2 1.2 1.2 2.1v5c0 .8-.4 1.6-1.2 2.1L29 28.8c-.7.4-1.6.4-2.4 0l-4.3-2.5c-.7-.4-1.2-1.2-1.2-2.1V21l-3.8 2.2v3.3c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l8.1-4.7c.7-.4 1.2-1.2 1.2-2.1V17c0-.8-.4-1.6-1.2-2.1L29 10.2z"
          fill="#8247e5"
        />
      </svg>
    );
  };

  static solana = ({ ...props }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 397.7 311.7" {...props}>
        <linearGradient
          id="prefix__a"
          gradientUnits="userSpaceOnUse"
          x1={360.879}
          y1={351.455}
          x2={141.213}
          y2={-69.294}
          gradientTransform="matrix(1 0 0 -1 0 314)"
        >
          <stop offset={0} stopColor="#00ffa3" />
          <stop offset={1} stopColor="#dc1fff" />
        </linearGradient>
        <path
          d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z"
          fill="url(#prefix__a)"
        />
        <linearGradient
          id="prefix__b"
          gradientUnits="userSpaceOnUse"
          x1={264.829}
          y1={401.601}
          x2={45.163}
          y2={-19.148}
          gradientTransform="matrix(1 0 0 -1 0 314)"
        >
          <stop offset={0} stopColor="#00ffa3" />
          <stop offset={1} stopColor="#dc1fff" />
        </linearGradient>
        <path
          d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"
          fill="url(#prefix__b)"
        />
        <linearGradient
          id="prefix__c"
          gradientUnits="userSpaceOnUse"
          x1={312.548}
          y1={376.688}
          x2={92.882}
          y2={-44.061}
          gradientTransform="matrix(1 0 0 -1 0 314)"
        >
          <stop offset={0} stopColor="#00ffa3" />
          <stop offset={1} stopColor="#dc1fff" />
        </linearGradient>
        <path
          d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"
          fill="url(#prefix__c)"
        />
      </svg>
    );
  };

  static avalanche = ({ ...props }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 254 254" xmlSpace="preserve" {...props}>
        <circle
          cx={127}
          cy={127}
          r={127}
          style={{
            fillRule: 'evenodd',
            clipRule: 'evenodd',
            fill: '#e84142'
          }}
        />
        <path
          d="M171.8 130.3c4.4-7.6 11.5-7.6 15.9 0l27.4 48.1c4.4 7.6.8 13.8-8 13.8h-55.2c-8.7 0-12.3-6.2-8-13.8l27.9-48.1zm-53-92.6c4.4-7.6 11.4-7.6 15.8 0l6.1 11L155.1 74c3.5 7.2 3.5 15.7 0 22.9l-48.3 83.7c-4.4 6.8-11.7 11.1-19.8 11.6H46.9c-8.8 0-12.4-6.1-8-13.8l79.9-140.7z"
          style={{
            fill: '#fff'
          }}
        />
      </svg>
    );
  };

  static metamask = ({ ...props }) => {
    return (
      <svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="75" cy="75" r="75" fill="#FCEAE7" />
        <path
          d="M110.967 37L79.3613 60.4741L85.206 46.6247L110.967 37Z"
          fill="#E2761B"
          stroke="#E2761B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M38.0039 37L69.3557 60.6965L63.7968 46.6247L38.0039 37Z"
          fill="#E4761B"
          stroke="#E4761B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M99.5954 91.413L91.1777 104.309L109.188 109.265L114.366 91.6988L99.5954 91.413Z"
          fill="#E4761B"
          stroke="#E4761B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M34.668 91.6988L39.8138 109.265L57.8244 104.309L49.4068 91.413L34.668 91.6988Z"
          fill="#E4761B"
          stroke="#E4761B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M56.8098 69.6223L51.791 77.2141L69.6745 78.0082L69.0392 58.7905L56.8098 69.6223Z"
          fill="#E4761B"
          stroke="#E4761B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M92.1625 69.6223L79.7743 58.5682L79.3613 78.0082L97.2131 77.2141L92.1625 69.6223Z"
          fill="#E4761B"
          stroke="#E4761B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M57.8242 104.309L68.5607 99.0682L59.2854 91.8258L57.8242 104.309Z"
          fill="#E4761B"
          stroke="#E4761B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M80.4102 99.0682L91.1784 104.309L89.6855 91.8258L80.4102 99.0682Z"
          fill="#E4761B"
          stroke="#E4761B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M91.1764 104.309L80.4082 99.0682L81.2659 106.088L81.1706 109.042L91.1764 104.309Z"
          fill="#D7C1B3"
          stroke="#D7C1B3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M57.8242 104.309L67.8301 109.042L67.7666 106.088L68.5607 99.0682L57.8242 104.309Z"
          fill="#D7C1B3"
          stroke="#D7C1B3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M67.9889 87.1882L59.0312 84.5517L65.3524 81.6611L67.9889 87.1882Z"
          fill="#233447"
          stroke="#233447"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M80.9785 87.1882L83.615 81.6611L89.9679 84.5517L80.9785 87.1882Z"
          fill="#233447"
          stroke="#233447"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M57.8219 104.309L59.3466 91.413L49.4043 91.6988L57.8219 104.309Z"
          fill="#CD6116"
          stroke="#CD6116"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M89.6484 91.413L91.1731 104.309L99.5908 91.6988L89.6484 91.413Z"
          fill="#CD6116"
          stroke="#CD6116"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M97.2111 77.2141L79.3594 78.0082L81.0111 87.1882L83.6476 81.6612L90.0005 84.5518L97.2111 77.2141Z"
          fill="#CD6116"
          stroke="#CD6116"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M59.0275 84.5518L65.3804 81.6612L67.9852 87.1882L69.6687 78.0082L51.7852 77.2141L59.0275 84.5518Z"
          fill="#CD6116"
          stroke="#CD6116"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M51.7891 77.2141L59.2855 91.8259L59.0314 84.5518L51.7891 77.2141Z"
          fill="#E4751F"
          stroke="#E4751F"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M90.0012 84.5518L89.6836 91.8259L97.2118 77.2141L90.0012 84.5518Z"
          fill="#E4751F"
          stroke="#E4751F"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M69.6718 78.0083L67.9883 87.1883L70.0847 98.0201L70.5612 83.7577L69.6718 78.0083Z"
          fill="#E4751F"
          stroke="#E4751F"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M79.3596 78.0083L78.502 83.7259L78.8831 98.0201L81.0114 87.1883L79.3596 78.0083Z"
          fill="#E4751F"
          stroke="#E4751F"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M81.013 87.1882L78.8848 98.02L80.4095 99.0682L89.6848 91.8259L90.0024 84.5518L81.013 87.1882Z"
          fill="#F6851B"
          stroke="#F6851B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M59.0312 84.5518L59.2854 91.8259L68.5607 99.0682L70.0854 98.02L67.9889 87.1882L59.0312 84.5518Z"
          fill="#F6851B"
          stroke="#F6851B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M81.1713 109.042L81.2666 106.088L80.4724 105.389H68.4972L67.7666 106.088L67.8301 109.042L57.8242 104.309L61.3183 107.168L68.4019 112.092H80.5677L87.683 107.168L91.1771 104.309L81.1713 109.042Z"
          fill="#C0AD9E"
          stroke="#C0AD9E"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M80.408 99.0681L78.8833 98.0199H70.0844L68.5597 99.0681L67.7656 106.088L68.4962 105.389H80.4715L81.2656 106.088L80.408 99.0681Z"
          fill="#161616"
          stroke="#161616"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M112.3 61.9988L115 49.0388L110.966 37L80.4082 59.68L92.1611 69.6223L108.774 74.4823L112.459 70.1941L110.871 69.0506L113.412 66.7318L111.442 65.207L113.983 63.2694L112.3 61.9988Z"
          fill="#763D16"
          stroke="#763D16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M34 49.0388L36.7 61.9988L34.9847 63.2694L37.5259 65.207L35.5882 66.7318L38.1294 69.0506L36.5412 70.1941L40.1941 74.4823L56.807 69.6223L68.56 59.68L38.0024 37L34 49.0388Z"
          fill="#763D16"
          stroke="#763D16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M108.772 74.4823L92.1593 69.6223L97.2099 77.2141L89.6816 91.8258L99.5922 91.6988H114.363L108.772 74.4823Z"
          fill="#F6851B"
          stroke="#F6851B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M56.808 69.6223L40.195 74.4823L34.668 91.6988H49.4068L59.2856 91.8258L51.7891 77.2141L56.808 69.6223Z"
          fill="#F6851B"
          stroke="#F6851B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M79.3596 78.0083L80.4079 59.68L85.2361 46.6248H63.7949L68.5596 59.68L69.6714 78.0083L70.0526 83.7894L70.0843 98.02H78.8832L78.9467 83.7894L79.3596 78.0083Z"
          fill="#F6851B"
          stroke="#F6851B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  static metamaskAlt = ({ ...props }) => {
    return (
      <svg
        id="prefix__Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x={0}
        y={0}
        viewBox="0 0 318.6 318.6"
        xmlSpace="preserve"
        {...props}
      >
        <style>
          {
            '.prefix__st1,.prefix__st6{fill:#e4761b;stroke:#e4761b;stroke-linecap:round;stroke-linejoin:round}.prefix__st6{fill:#f6851b;stroke:#f6851b}'
          }
        </style>
        <path
          d="M274.1 35.5l-99.5 73.9L193 65.8z"
          fill="#e2761b"
          stroke="#e2761b"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="prefix__st1"
          d="M44.4 35.5l98.7 74.6-17.5-44.3zm193.9 171.3l-26.5 40.6 56.7 15.6 16.3-55.3zm-204.4.9L50.1 263l56.7-15.6-26.5-40.6z"
        />
        <path
          className="prefix__st1"
          d="M103.6 138.2l-15.8 23.9 56.3 2.5-2-60.5zm111.3 0l-39-34.8-1.3 61.2 56.2-2.5zM106.8 247.4l33.8-16.5-29.2-22.8zm71.1-16.5l33.9 16.5-4.7-39.3z"
        />
        <path
          d="M211.8 247.4l-33.9-16.5 2.7 22.1-.3 9.3zm-105 0l31.5 14.9-.2-9.3 2.5-22.1z"
          fill="#d7c1b3"
          stroke="#d7c1b3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M138.8 193.5l-28.2-8.3 19.9-9.1zm40.9 0l8.3-17.4 20 9.1z"
          fill="#233447"
          stroke="#233447"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M106.8 247.4l4.8-40.6-31.3.9zM207 206.8l4.8 40.6 26.5-39.7zm23.8-44.7l-56.2 2.5 5.2 28.9 8.3-17.4 20 9.1zm-120.2 23.1l20-9.1 8.2 17.4 5.3-28.9-56.3-2.5z"
          fill="#cd6116"
          stroke="#cd6116"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M87.8 162.1l23.6 46-.8-22.9zm120.3 23.1l-1 22.9 23.7-46zm-64-20.6l-5.3 28.9 6.6 34.1 1.5-44.9zm30.5 0l-2.7 18 1.2 45 6.7-34.1z"
          fill="#e4751f"
          stroke="#e4751f"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="prefix__st6"
          d="M179.8 193.5l-6.7 34.1 4.8 3.3 29.2-22.8 1-22.9zm-69.2-8.3l.8 22.9 29.2 22.8 4.8-3.3-6.6-34.1z"
        />
        <path
          d="M180.3 262.3l.3-9.3-2.5-2.2h-37.7l-2.3 2.2.2 9.3-31.5-14.9 11 9 22.3 15.5h38.3l22.4-15.5 11-9z"
          fill="#c0ad9e"
          stroke="#c0ad9e"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M177.9 230.9l-4.8-3.3h-27.7l-4.8 3.3-2.5 22.1 2.3-2.2h37.7l2.5 2.2z"
          fill="#161616"
          stroke="#161616"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M278.3 114.2l8.5-40.8-12.7-37.9-96.2 71.4 37 31.3 52.3 15.3 11.6-13.5-5-3.6 8-7.3-6.2-4.8 8-6.1zM31.8 73.4l8.5 40.8-5.4 4 8 6.1-6.1 4.8 8 7.3-5 3.6 11.5 13.5 52.3-15.3 37-31.3-96.2-71.4z"
          fill="#763d16"
          stroke="#763d16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="prefix__st6"
          d="M267.2 153.5l-52.3-15.3 15.9 23.9-23.7 46 31.2-.4h46.5zm-163.6-15.3l-52.3 15.3-17.4 54.2h46.4l31.1.4-23.6-46zm71 26.4l3.3-57.7 15.2-41.1h-67.5l15 41.1 3.5 57.7 1.2 18.2.1 44.8h27.7l.2-44.8z"
        />
      </svg>
    );
  };

  static walletconnect = ({ ...props }) => (
    <svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="75" cy="75" r="75" fill="#E7EEFC" />
      <path
        d="M42.065 54.1332C60.2408 36.3376 89.7096 36.3376 107.885 54.1332L110.073 56.2749C110.982 57.1647 110.982 58.6073 110.073 59.4971L102.59 66.8236C102.136 67.2685 101.399 67.2685 100.944 66.8236L97.9342 63.8763C85.2543 51.4616 64.6961 51.4616 52.0163 63.8763L48.7925 67.0326C48.3381 67.4775 47.6014 67.4775 47.147 67.0326L39.6641 59.7061C38.7553 58.8164 38.7553 57.3737 39.6641 56.484L42.065 54.1332ZM123.361 69.2851L130.021 75.8056C130.929 76.6954 130.929 78.138 130.021 79.0278L99.991 108.43C99.0822 109.32 97.6088 109.32 96.7 108.43C96.7 108.43 96.7 108.43 96.7 108.43L75.3868 87.5624C75.1596 87.3399 74.7912 87.3399 74.564 87.5624C74.564 87.5624 74.564 87.5624 74.564 87.5624L53.2512 108.43C52.3424 109.32 50.869 109.32 49.9602 108.43C49.9602 108.43 49.9602 108.43 49.9602 108.43L19.9296 79.0274C19.0208 78.1376 19.0208 76.695 19.9296 75.8052L26.5895 69.2847C27.4983 68.3949 28.9717 68.3949 29.8805 69.2847L51.1941 90.1524C51.4213 90.3749 51.7896 90.3749 52.0168 90.1524C52.0168 90.1524 52.0168 90.1524 52.0168 90.1524L73.3293 69.2847C74.2381 68.3949 75.7115 68.3948 76.6203 69.2846C76.6204 69.2846 76.6204 69.2846 76.6204 69.2846L97.9339 90.1524C98.1611 90.3749 98.5295 90.3749 98.7567 90.1524L120.07 69.2851C120.979 68.3953 122.452 68.3953 123.361 69.2851Z"
        fill="#3B99FC"
      />
    </svg>
  );

  static walletconnectAlt = ({ ...props }) => (
    <svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M61.439 36.256c48.91-47.888 128.212-47.888 177.123 0l5.886 5.764a6.041 6.041 0 010 8.67l-20.136 19.716a3.179 3.179 0 01-4.428 0l-8.101-7.931c-34.122-33.408-89.444-33.408-123.566 0l-8.675 8.494a3.179 3.179 0 01-4.428 0L54.978 51.253a6.041 6.041 0 010-8.67l6.46-6.327zM280.206 77.03l17.922 17.547a6.041 6.041 0 010 8.67l-80.81 79.122c-2.446 2.394-6.41 2.394-8.856 0l-57.354-56.155a1.59 1.59 0 00-2.214 0L91.54 182.37c-2.446 2.394-6.411 2.394-8.857 0L1.872 103.247a6.041 6.041 0 010-8.671l17.922-17.547c2.445-2.394 6.41-2.394 8.856 0l57.355 56.155a1.59 1.59 0 002.214 0L145.57 77.03c2.446-2.394 6.41-2.395 8.856 0l57.355 56.155a1.59 1.59 0 002.214 0L271.35 77.03c2.446-2.394 6.41-2.394 8.856 0z"
        fill="#3B99FC"
        fillRule="nonzero"
      />
    </svg>
  );

  static coinbasewallet = ({ ...props }) => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
        fill="#1652F0"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.45508 20.0006C5.45508 28.0338 11.9673 34.546 20.0006 34.546C28.0338 34.546 34.546 28.0338 34.546 20.0006C34.546 11.9673 28.0338 5.45508 20.0006 5.45508C11.9673 5.45508 5.45508 11.9673 5.45508 20.0006ZM17.3137 15.3145C16.2091 15.3145 15.3137 16.2099 15.3137 17.3145V22.6882C15.3137 23.7928 16.2091 24.6882 17.3137 24.6882H22.6874C23.792 24.6882 24.6874 23.7928 24.6874 22.6882V17.3145C24.6874 16.2099 23.792 15.3145 22.6874 15.3145H17.3137Z"
        fill="white"
      />
    </svg>
  );

  static coinbasewalletAlt = ({ ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" {...props}>
      <g fill="#255DEF">
        <path d="M183.3 42.6c-22.8 2.7-47.6 11.3-65.8 22.6-35.6 22.3-61.6 57.4-71.9 97.3-11.1 42.3-4.2 88.2 18.7 125.2 24.7 39.8 64.2 66.4 111.2 74.9 7 1.2 15 1.8 26.5 1.8 18.4 0 29.8-1.6 46.5-6.6 55.6-16.5 99.2-63.4 111.3-119.9 7.4-33.9 4-68.1-9.6-98.9-21.2-48-61.9-81.8-112.7-93.6-9.3-2.1-28.4-4.4-36.5-4.3-3.6.1-11.6.7-17.7 1.5zm34.2 66.8c57.2 10.1 92.1 67 74.8 122-15.9 50.6-70.5 78.3-120.4 61.2-31.9-10.9-54.8-36.3-62.6-69.2-2.2-9.5-2.4-29.7-.4-38.9 5.7-25.9 19.7-46.5 41.6-60.9 19.6-12.9 44.4-18.2 67-14.2z" />
        <path d="M174.2 174.6c-2.2 1.5-2.2 1.8-2.2 28.3 0 24.7.1 26.9 1.8 28.4 1.6 1.5 5.1 1.7 28.4 1.7 24.4 0 26.6-.1 28.1-1.8 1.5-1.6 1.7-5.1 1.7-28.4 0-24.4-.1-26.6-1.8-28.1-1.6-1.5-5.1-1.7-27.8-1.7-21.9 0-26.3.2-28.2 1.6z" />
      </g>
    </svg>
  );

  static discord = ({ ...props }) => (
    <svg
      viewBox="0 0 32 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <rect y="0.157959" width="32" height="33.6842" fill="url(#pattern0)" />
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_826_1778" transform="translate(-0.0263158) scale(0.00467836)" />
        </pattern>
        <image
          id="image0_826_1778"
          width="225"
          height="225"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );

  static twitter = ({ ...props }) => (
    <svg viewBox="0 0 32 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M32 2.99864C30.823 3.4804 29.557 3.80618 28.229 3.95292C29.585 3.2026 30.626 2.01576 31.116 0.600951C29.848 1.29497 28.442 1.79887 26.947 2.07113C25.749 0.89351 24.043 0.157959 22.155 0.157959C18.529 0.157959 15.59 2.87036 15.59 6.21679C15.59 6.69116 15.648 7.15354 15.76 7.59745C10.303 7.34458 5.466 4.93212 2.228 1.26636C1.663 2.16157 1.339 3.2026 1.339 4.31285C1.339 6.4143 2.498 8.26932 4.259 9.35558C3.183 9.3242 2.171 9.05194 1.286 8.59788C1.285 8.62372 1.285 8.64863 1.285 8.67448C1.285 11.6102 3.548 14.0587 6.552 14.6152C6.001 14.7536 5.421 14.8274 4.822 14.8274C4.399 14.8274 3.988 14.7896 3.587 14.7195C4.422 17.1264 6.847 18.8781 9.72 18.927C7.473 20.5522 4.642 21.5203 1.566 21.5203C1.036 21.5203 0.514 21.4917 0 21.4363C2.905 23.1548 6.356 24.158 10.064 24.158C22.14 24.158 28.743 14.9253 28.743 6.91912C28.743 6.65609 28.737 6.39491 28.724 6.13466C30.007 5.28097 31.12 4.2141 32 2.99864Z"
        fill="#292B29"
      />
    </svg>
  );

  static medium = ({ ...props }) => (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <rect width="32" height="32" fill="url(#pattern0)" />
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_826_1767" transform="scale(0.00444444)" />
        </pattern>
        <image
          id="image0_826_1767"
          width="225"
          height="225"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );

  static instagram = ({ ...props }) => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M16 2.88294C20.2722 2.88294 20.7782 2.8992 22.4653 2.97618C24.0253 3.04737 24.8725 3.30803 25.4363 3.52708C26.1831 3.81733 26.7162 4.16411 27.276 4.72397C27.8359 5.28383 28.1827 5.81688 28.4729 6.56366C28.692 7.12752 28.9526 7.97471 29.0238 9.53463C29.1008 11.2218 29.1171 11.7278 29.1171 16C29.1171 20.2722 29.1008 20.7782 29.0238 22.4654C28.9526 24.0254 28.692 24.8725 28.4729 25.4364C28.1827 26.1832 27.8359 26.7162 27.276 27.2761C26.7162 27.836 26.1831 28.1827 25.4363 28.4729C24.8725 28.692 24.0253 28.9527 22.4653 29.0239C20.7784 29.1009 20.2724 29.1171 16 29.1171C11.7275 29.1171 11.2215 29.1009 9.53463 29.0239C7.97464 28.9527 7.12746 28.692 6.56366 28.4729C5.81682 28.1827 5.28376 27.836 4.7239 27.2761C4.16404 26.7162 3.81727 26.1832 3.52708 25.4364C3.30796 24.8725 3.04731 24.0254 2.97611 22.4654C2.89914 20.7782 2.88288 20.2722 2.88288 16C2.88288 11.7278 2.89914 11.2218 2.97611 9.53469C3.04731 7.97471 3.30796 7.12752 3.52708 6.56366C3.81727 5.81688 4.16404 5.28383 4.7239 4.72397C5.28376 4.16411 5.81682 3.81733 6.56366 3.52708C7.12746 3.30803 7.97464 3.04737 9.53456 2.97618C11.2218 2.8992 11.7278 2.88294 16 2.88294ZM16 0C11.6546 0 11.1098 0.0184185 9.40322 0.0962843C7.70014 0.174023 6.53711 0.444458 5.51933 0.840011C4.46719 1.2489 3.57491 1.796 2.68542 2.68548C1.79593 3.57497 1.24884 4.46725 0.839948 5.51939C0.444394 6.53717 0.17396 7.70021 0.0962208 9.40328C0.018355 11.1098 0 11.6547 0 16C0 20.3454 0.018355 20.8903 0.0962208 22.5968C0.17396 24.2999 0.444394 25.4629 0.839948 26.4807C1.24884 27.5327 1.79593 28.4251 2.68542 29.3146C3.57491 30.2041 4.46719 30.7512 5.51933 31.1601C6.53711 31.5556 7.70014 31.826 9.40322 31.9038C11.1098 31.9816 11.6546 32 16 32C20.3453 32 20.8902 31.9816 22.5967 31.9038C24.2998 31.826 25.4628 31.5556 26.4806 31.1601C27.5328 30.7512 28.425 30.2041 29.3145 29.3146C30.204 28.4251 30.7511 27.5328 31.16 26.4807C31.5555 25.4629 31.826 24.2999 31.9037 22.5968C31.9816 20.8903 32 20.3454 32 16C32 11.6547 31.9816 11.1098 31.9037 9.40328C31.826 7.70021 31.5555 6.53717 31.16 5.51939C30.7511 4.46725 30.204 3.57497 29.3145 2.68548C28.425 1.796 27.5328 1.2489 26.4806 0.840011C25.4628 0.444458 24.2998 0.174023 22.5967 0.0962843C20.8902 0.0184185 20.3453 0 16 0ZM16 7.78379C11.4623 7.78379 7.78373 11.4623 7.78373 16C7.78373 20.5377 11.4623 24.2163 16 24.2163C20.5377 24.2163 24.2162 20.5377 24.2162 16C24.2162 11.4623 20.5377 7.78379 16 7.78379ZM16 21.3334C13.0545 21.3334 10.6666 18.9455 10.6666 16C10.6666 13.0545 13.0545 10.6667 16 10.6667C18.9455 10.6667 21.3333 13.0545 21.3333 16C21.3333 18.9455 18.9455 21.3334 16 21.3334ZM26.4608 7.45918C26.4608 8.51958 25.6012 9.37921 24.5408 9.37921C23.4804 9.37921 22.6208 8.51958 22.6208 7.45918C22.6208 6.39878 23.4804 5.53921 24.5408 5.53921C25.6012 5.53921 26.4608 6.39878 26.4608 7.45918Z"
        fill="black"
      />
    </svg>
  );
}
