export default function Button({
  children,
  textOnly,
  className,
  ...otherProps
}) {
  const cssClass = `${textOnly ? `text-button` : `button `}` + `${className ? className : ''}` // prettier-ignore

  return (
    <button className={cssClass} {...otherProps}>
      {children}
    </button>
  );
}
