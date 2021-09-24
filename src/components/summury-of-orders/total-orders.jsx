export const TotalOrders = ({ title, total, style }) => {
  return (
    <div className={style}>
      <h3 className="text text_type_main-medium">{title}</h3>
      <p className="text text_type_digits-large">{total}</p>
    </div>
  )
}