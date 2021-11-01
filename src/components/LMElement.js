const LMElement = ({ icon, title, active }) => {
  return (
    <div className={`leftmenu_elem ${active && 'active'}`}>
      <img src={icon} alt='home' />
      <h2 className='leftmenu_title'>{title}</h2>
      &nbsp; &nbsp;
    </div>
  );
};

export default LMElement;
