import {PropTypes} from 'prop-types'
import {useSound} from 'use-sound'
import Pulse from './../sound/pulse.wav'
export default function Square ({children , isSelected , updateBoard, index }) {
    const [play] = useSound(Pulse,{
      volume: 0.2,
    })
    const className = `square ${isSelected ? "is-selected" : ""}`;
    const handleClick = () => {
      updateBoard(index);
    };
    return (
      <div onClick={handleClick} onMouseOver={play} className={className}>
        {children}
      </div>
    );
  }

Square.propTypes = {
  children: PropTypes.node.isRequired,
  isSelected: PropTypes.bool.isRequired,
  updateBoard: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};