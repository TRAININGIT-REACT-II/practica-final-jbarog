import TopMenu from "components/ui/TopMenu";

const LoggedLayout = ({ title, clickAdd, hello, children }) => {
  return (
    <div className="layout logged">
      <TopMenu title={title} clickAdd={clickAdd}/>
      <main>
        {children}
      </main>
    </div>
  );
}

export default LoggedLayout;
