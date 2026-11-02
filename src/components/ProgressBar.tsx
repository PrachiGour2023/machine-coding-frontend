import { useEffect, useState } from "react";

const ProgressBar = () => {
    const bars = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    const [progress, setProgress] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setProgress(true)
        }, 1000);
    }, [])

    return (
        <div>
            {
                bars.map(item => {
                    return (
                        <div style={{
                            overflow: 'hidden',
                            margin: '10px',
                            border: '1px solid grey',
                            borderRadius: '8px'
                        }}>
                            <div style={{
                                color: 'white',
                                width: progress ? `${item}%` : "0%",
                                backgroundColor: 'green',
                                transition: 'width 0.5s ease-in',
                                textAlign: 'end'
                            }}>
                                {item}%
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};
export default ProgressBar;
