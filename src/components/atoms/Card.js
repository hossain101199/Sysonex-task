
const Card = ({className, children}) => {
    return (
        <div id="card" className={className}>
         {children}
        </div>
    );
};

export default Card;