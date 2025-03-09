import { Button } from "antd";
import React from "react";

const BaseButton = ({ 
    icon, 
    text,
    children,
    className,
    ...props
}) => {
  return (
    <Button
      className={`inline-flex items-center justify-center gap-2.5 rounded-md px-10 py-4 text-center font-medium hover:bg-opacity-90 lg:px-8 xl:px-10 ` + className}
      {...props}
    >
        {icon && <span>{icon}</span>}
        {text && <span>{text}</span>}
        {children}
    </Button>
  );
};

export default BaseButton