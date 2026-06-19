import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  active?: boolean;
  plain?: boolean;
  small?: boolean;
}

/** Square icon button used across the header, blade and menus. */
export function IconButton({
  children,
  active,
  plain,
  small,
  className = '',
  ...rest
}: IconButtonProps) {
  const classes = [
    'icon-btn',
    plain ? 'icon-btn--plain' : '',
    active ? 'icon-btn--active' : '',
    small ? 'icon-btn--sm' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
