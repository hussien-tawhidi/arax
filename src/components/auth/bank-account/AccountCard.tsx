import { HiBanknotes } from "react-icons/hi2";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { IconContext } from "react-icons";
interface accountCardType {
  userId?: string;
  bankName: string;
  _id: string;
  accountNumber: string;
  cardNumber: string;
  shabaNumber?: string;
  ownerName: string;
  isDefault: boolean;
  status: "active" | "inactive" | "pending";
}
interface AccountCardProps extends accountCardType {
  onEdit?: () => void;
  onDelete?: () => void;
  onSetDefault?: () => void;
}

const AccountCard = ({
  bankName,
  accountNumber,
  cardNumber,
  ownerName,
  isDefault,
  onEdit,
  onDelete,
  onSetDefault,
}: AccountCardProps) => {
  return (
    <div
      className={`relative p-5 transition rounded hover:shadow-lg backdrop-blur-md ${
        isDefault
          ? "bg-gradient-to-br shadow-sm from-red/80 to-red/90 border-darker-black/60"
          : "border-darker-black/20 border-b"
      }`}>
      <div className='flex items-start gap-4'>
        <div className='bg-light text-red p-3 rounded-full'>
          <HiBanknotes className='w-6 h-6' />
        </div>

        <div className='flex-1 space-y-2'>
          <div className='flex justify-between items-center'>
            <h3
              className={`text-base font-bold ${
                isDefault && "text-light"
              } text-darker-black/70`}>
              {bankName}
            </h3>
            {isDefault && (
              <span className='text-xs bg-light text-red px-2 py-0.5 rounded-full'>
                پیش‌فرض
              </span>
            )}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm'>
            <div>
              <p
                className={
                  isDefault ? "text-light/70" : "text-darker-black/70"
                }>
                شماره حساب
              </p>
              <p
                className={`font-medium ${
                  isDefault ? "text-light" : "text-darker-black"
                }`}>
                {accountNumber}
              </p>
            </div>
            <div>
              <p
                className={
                  isDefault ? "text-light/70" : "text-darker-black/70"
                }>
                شماره کارت
              </p>
              <p
                className={`font-medium ${
                  isDefault ? "text-light" : "text-darker-black"
                }`}>
                {cardNumber}
              </p>
            </div>
            <div>
              <p
                className={
                  isDefault ? "text-light/70" : "text-darker-black/70"
                }>
                نام دارنده حساب
              </p>
              <p
                className={`font-medium ${
                  isDefault ? "text-light" : "text-darker-black"
                }`}>
                {ownerName}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-5 pt-4 border-t border-darker-black/10 flex gap-3'>
        <IconContext.Provider
          value={{
            className:
              "text-darker-black/70 hover:text-blue-300 transition text-xl",
          }}>
          <button
            onClick={onEdit}
            aria-label='Edit account'
            className={
              isDefault
                ? "bg-light rounded-full flex items-center justify-center w-8 h-8"
                : ""
            }>
            <CiEdit />
          </button>
        </IconContext.Provider>

        {!isDefault && (
          <button
            onClick={onSetDefault}
            className='text-sm text-darker-black/70 border border-darker-black/50 px-4 py-1.5 rounded-lg hover:bg-darker-black/10 transition'>
            تنظیم به عنوان پیش‌فرض
          </button>
        )}

        <IconContext.Provider
          value={{
            className: "text-red hover:text-red/90 ml-auto text-xl transition",
          }}>
          <button
            onClick={onDelete}
            aria-label='Delete account'
            className={
              isDefault
                ? "bg-light rounded-full flex items-center justify-center w-8 h-8 text-red"
                : ""
            }>
            <AiOutlineDelete className='flex items-center justify-center w-full' />
          </button>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default AccountCard;
