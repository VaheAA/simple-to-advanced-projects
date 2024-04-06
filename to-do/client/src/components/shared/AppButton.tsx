import { ReactNode } from 'react';

type ButtonType = 'button' | 'submit';
type ButtonVariant = 'primary' | 'success' | 'warning' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface AppButtonProps {
  label?: string;
  type?: ButtonType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  classNames?: string;
  isIcon?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
}

const buttonVariantStyle: Record<ButtonVariant, string> = {
  primary: 'bg-blue-500 hover:bg-blue-700 text-white font-bold',
  success: 'bg-green-500 hover:bg-green-700 text-white font-bold',
  warning: 'bg-yellow-400 hover:bg-yellow-500 text-white font-bold',
  danger: 'bg-red-500 hover:bg-red-700 text-white font-bold'
};

const buttonSizeStyle: Record<ButtonSize, string> = {
  small: 'py-1 px-3 text-sm leading-tight',
  medium: 'py-2 px-4 text-md leading-tight',
  large: 'py-3 px-6 text-lg leading-tight'
};

const iconButtonStyles = 'border-2 border-gray-200 rounded-sm p-1 hover:border-gray-300';

export default function AppButton({
  label,
  type = 'button',
  onClick,
  variant = 'primary',
  size = 'medium',
  isIcon = false,
  icon,
  classNames
}: AppButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded transition-all ${classNames} ${!isIcon && buttonVariantStyle[variant]} ${!isIcon && buttonSizeStyle[size]} ${isIcon && iconButtonStyles}`}>
      {!isIcon ? label : icon}
    </button>
  );
}
