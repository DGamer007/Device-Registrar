import Modal from 'react-modal'
import classes from '../../styles/device-modal.module.css'

const DeviceModal = ({ isOpen, registerDevice }) => {
    return (
        <Modal
            isOpen={isOpen}
            className={classes.modal}
            portalClassName={classes.overlay}
        >
            <h2>We have Detected a New Device !</h2>
            <div className={classes.container}>
                <form onSubmit={registerDevice}>
                    <input type='text' name='name' placeholder='Device Name' required />
                    <input type='text' name='model' placeholder='Device Model' required />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </Modal>
    )
}

export default DeviceModal