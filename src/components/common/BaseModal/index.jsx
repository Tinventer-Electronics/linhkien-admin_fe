import { Modal } from "antd";
import React from "react";
import "./styles.scss";

const BaseModal = ({ visible, title, content, ...props }) => {
    return (
        <Modal
            title={title}
            open={visible}
            maskClosable={false}
            cancelButtonProps={{
                className: "btn-cancel",
            }}
            {...props}
            okButtonProps={{
                className: "bg-main btn-ok",
                ...props.okButtonProps,
            }}
        >
            {content}
        </Modal>
    );
};
export default BaseModal;