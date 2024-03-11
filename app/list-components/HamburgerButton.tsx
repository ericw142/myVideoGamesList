import React, { useState } from 'react'

const HamburgerButton = () => {
    const hamburger = "w-16 h-2 bg-black rounded-full before:content[''] before:absolute before:w-16 before:h-2 before:bg-black before:rounded-full before:-translate-y-4 after:content[''] after:absolute after:w-16 after:h-2 after:bg-black after:rounded-full after:translate-y-4 after:transition-all after:duration-150";
    const toggledHamburger = "w-16 h-0 bg-white rounded-full before:content[''] before:absolute before:w-16 before:h-2 before:bg-black before:rounded-full before:-translate-y-0 after:content[''] after:absolute after:w-16 after:h-2 after:bg-black after:rounded-full after:translate-y-0 after:transition-all after:duration-150 before:rotate-45 after:-rotate-45";
    const [toggledClass, setToggledClass] = useState<string>(hamburger)

    return (
        <div 
            onClick={() => {
                if (toggledClass === toggledHamburger) {
                    setToggledClass(hamburger)
                } else {
                    setToggledClass(toggledHamburger)
                }
            }}
            className="grid place-content-center w-20 h-20 p-6 mx-auto"
        >
            <div className={toggledClass}></div>
        </div>
    )
}

export default HamburgerButton