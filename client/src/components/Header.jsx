
function Header() {
    return (
        <header className=" bg-[#557791] margin-auto -mx-4 px-8 py-4 shadow-lg flex items-center justify-center">
            {/* IMG*/}
            <div className="inline-block align-middle w-[35px]">
                <img src="/images/somnia-logo.png" alt="Somnia Logo" />
            </div>

            {/* TITLE */}
            <div className="logo-text inline-block  align-middle ml-[10px] text-2xl font-bold text-[#efedc0] font-[Forum]">
                <h1>SOMNIA</h1>
            </div>
        </header>
    );
}

export default Header;
