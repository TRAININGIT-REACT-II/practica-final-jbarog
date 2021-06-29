import TopMenu from "components/ui/TopMenu";

const LoggedLayout = ({ title, clickAdd, hello, children, onChangeDarkMode }) => {
  return (
    <div className="layout logged">
      <TopMenu title={title} clickAdd={clickAdd} onChangeDarkMode={onChangeDarkMode}/>
      <main>
        {children}
      </main>
    </div>
  );
}

export default LoggedLayout;
