import classes from '../../styles/device.module.css'

const Device = ({ data: { deviceName, deviceModel } }) => {
    return (
        <div className={classes.container}>
            <div>
                <p className={classes.tag}>Device Name</p>
                <p className={classes.value}>{deviceName}</p>
            </div>
            <div>
                <p className={classes.tag}>Device Model</p>
                <p className={classes.value}>{deviceModel}</p>
            </div>
        </div>
    )
}

export default Device