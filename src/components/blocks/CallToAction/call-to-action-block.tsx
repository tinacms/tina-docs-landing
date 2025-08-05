import React from "react";
import { tinaField } from "tinacms/dist/react";
import { ModalButton } from "../../ui/modalButton";
import { Icon } from "../../icon";

interface Action {
  title?: string;
  description?: string;
  selectedIcon?: string;
}

interface CallToActionProps {
  title?: string;
  description?: string;
  actions?: Action[];
  buttonText?: string;
}

export const CallToActionBlock = ({ data }: { data: any }) => {
  const { title, description, actions, buttonText }: CallToActionProps = data;
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {title && (
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold mb-4"
              data-tina-field={tinaField({ title })}
            >
              {title}
            </h2>
            {description && (
              <div
                className="max-w-3xl mx-auto text-lg text-[#B5B3AD]"
                data-tina-field={tinaField({ description })}
              >
                {description}
              </div>
            )}
          </div>
        )}

        {actions && actions.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 text-center items-center justify-center">
            {actions.map((action, index) => (
              <div
                key={index}
                className="rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                {action.selectedIcon && (
                  <div className="flex items-center justify-center mb-4">
                    <Icon
                      data={{
                        name: action.selectedIcon,
                        color: "primary",
                        size: "small",
                        style: "regular",
                      }}
                    />
                  </div>
                )}
                {action.title && (
                  <h3
                    className="text-lg text-[#EEEEEC] font-semibold mb-2"
                    data-tina-field={tinaField({
                      actions: index,
                      title: action.title,
                    })}
                  >
                    {action.title}
                  </h3>
                )}
                {action.description && (
                  <p
                    className="text-[#B5B3AD] mb-4 text-sm"
                    data-tina-field={tinaField({
                      actions: index,
                      description: action.description,
                    })}
                  >
                    {action.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <ModalButton
            modal="book-demo"
            className="bg-[#CA3C11] text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors cursor-pointer"
            data-tina-field={tinaField({ buttonText })}
          >
            {buttonText}
          </ModalButton>
        </div>
      </div>
    </section>
  );
};
