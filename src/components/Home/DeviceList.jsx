import Device from './Device'
import classes from '../../styles/device-list.module.css'

const DeviceList = ({ devices }) => {
    return (
        <div className={classes.container}>
            {
                devices.map(device => <Device key={device.id} data={device} />)
            }
        </div>
    )
}

export default DeviceList