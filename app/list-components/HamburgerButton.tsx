import React, { useState } from 'react'

export interface Props {
    clickHandler: Function;
}

const HamburgerButton = (props: Props) => {
    const hamburger = "w-8 h-1 bg-black rounded-full before:content[''] before:absolute before:w-8 before:h-1 before:bg-black before:rounded-full before:-translate-y-2 after:content[''] after:absolute after:w-8 after:h-1 after:bg-black after:rounded-full after:translate-y-2 after:transition-all after:duration-150";
    const toggledHamburger = "w-8 h-0 bg-white rounded-full before:content[''] before:absolute before:w-8 before:h-1 before:bg-black before:rounded-full before:-translate-y-0 after:content[''] after:absolute after:w-8 after:h-1 after:bg-black after:rounded-full after:translate-y-0 after:transition-all after:duration-150 before:rotate-45 after:-rotate-45";
    const [toggledClass, setToggledClass] = useState<string>(hamburger)

    return (
        <div 
            onClick={() => {
                if (toggledClass === toggledHamburger) {
                    setToggledClass(hamburger)
                } else {
                    setToggledClass(toggledHamburger)
                }
                props.clickHandler()
            }}
            className="grid place-content-center p-6"
        >
            <div className='relative h-auto'>
                <div className={toggledClass}></div>
            </div>
        </div>
    )
}

export default HamburgerButton