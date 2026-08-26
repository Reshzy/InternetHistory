type DeviceFrameProps = {
  children: React.ReactNode;
  className?: string;
};

export function DeviceFrame({ children, className }: DeviceFrameProps) {
  return (
    <div
      className={["device-frame", className].filter(Boolean).join(" ")}
      data-device
    >
      <div className="device-ear" data-device-ear aria-hidden="true" />
      <div className="device-screen" data-device-screen>
        {children}
      </div>
      <div className="device-home" data-device-home aria-hidden="true" />
    </div>
  );
}
