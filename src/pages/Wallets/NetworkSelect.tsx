import { ChangeEventHandler, FC } from "react";

export const NETWORKS = [
  { label: "Goerli", value: "goerli" },
  { label: "Sepolia", value: "sepolia" },
];
export const DEFAULT_NETWORK = "goerli";

interface NetworkSelectProps {
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

const NetworkSelect: FC<NetworkSelectProps> = ({ onChange }) => (
  <div>
    <label htmlFor="network">Choose a testnet network:</label>
    <select
      name="network"
      id="network"
      defaultValue={DEFAULT_NETWORK}
      onChange={onChange}
    >
      {NETWORKS.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  </div>
);

export default NetworkSelect;
