import wallet from '../../assets/icons/wallet.svg';

export const Wallet = ({ width = 30, height = 30 }) => {
  const style = {
    width: `${width}px`,
    height: `${height}px`,
  };
  return <img src={wallet} alt="wallet" style={style}></img>;
};
