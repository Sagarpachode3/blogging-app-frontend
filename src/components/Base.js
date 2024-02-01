const Base=({title="Welcome to my website",children})=>{

    return(
        <div className="container-fluid">
            <h1>This is a Header</h1>
            {children}
            <h1>This is a Footer</h1>
        </div>
    );

};

export default Base;