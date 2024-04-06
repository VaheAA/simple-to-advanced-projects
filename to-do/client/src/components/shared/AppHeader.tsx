import logo from '../../assets/img/logo.png';
export default function AppHeader() {
  return (
    <header className="fixed left-0 top-0 right-0 h-[60px] bg-slate-100 z-[9999] shadow-lg">
      <div className="p-2 w-[90%] mx-auto flex items-center h-full">
        <div className="h-[45px]">
          <img className="object-cover h-full block" src={logo} alt="logo" />
        </div>
      </div>
    </header>
  );
}
