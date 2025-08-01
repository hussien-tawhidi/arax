type PaymentMethodsProps = {
  selected: string;
  onChange: (label: string) => void;
};

const methods = [
  { id: "card", label: "پرداخت با کارت بانکی" },
  { id: "wallet", label: "پرداخت با کیف پول" },
  { id: "upon", label: "پرداخت در محل" },
];

export default function PaymentMethods({
  selected,
  onChange,
}: PaymentMethodsProps) {
  return (
    <div className='text-darker-black/70 border-darker-black/10 border-b rounded-lg p-4'>
      <h2 className='text-lg font-semibold mb-4'>روش پرداخت</h2>
      <div className='space-y-3'>
        {methods.map((method) => (
          <label
            key={method.id}
            className={`flex items-center justify-between cursor-pointer border p-3 rounded-lg ${
              selected === method.label
                ? "border-green bg-green/5"
                : "border-none"
            }`}>
            <span className='text-sm font-medium'>{method.label}</span>
            <input
              type='radio'
              className='form-radio'
              checked={selected === method.label}
              onChange={() => onChange(method.label)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
