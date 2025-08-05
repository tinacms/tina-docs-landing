import React from "react";
import { tinaField } from "tinacms/dist/react";
import { Icon } from "../../icon";
import { ModalButton } from "../../ui/modalButton";

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
          <div className="text-center mb-4">
            <h2
              className="text-5xl font-bold mb-10"
              data-tina-field={tinaField(data, "title")}
            >
              {title}
            </h2>
            {description && (
              <div
                className="max-w-lg mx-auto text-lg text-muted-foreground px-8"
                data-tina-field={tinaField(data, "description")}
              >
                {description}
              </div>
            )}
          </div>
        )}

        {actions && actions.length > 0 && (
          <div className="flex mb-5 gap-16 text-center items-center justify-center max-w-5xl mx-auto px-4">
            {actions.map((action, index) => (
              <div
                key={index}
                className="rounded-lg p-6 flex flex-col items-center flex-1 max-w-xs"
              >
                {action.selectedIcon && (
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-amber-1/20 rounded-full p-3">
                      <Icon
                        data={{
                          name: action.selectedIcon,
                          color: "sandlight",
                          size: "xs",
                          style: "regular",
                        }}
                        tinaField={tinaField(
                          data.actions[index],
                          "selectedIcon"
                        )}
                      />
                    </div>
                  </div>
                )}
                {action.title && (
                  <h3
                    className="text-lg text-foreground font-semibold mb-4"
                    data-tina-field={tinaField(data.actions[index], "title")}
                  >
                    {action.title}
                  </h3>
                )}
                {action.description && (
                  <p
                    className="text-muted-foreground mb-4 text-sm max-w-lg mx-auto"
                    data-tina-field={tinaField(
                      data.actions[index],
                      "description"
                    )}
                  >
                    {action.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <ModalButton
            modal="book-demo"
            className="bg-primary text-white px-8 py-3 rounded-lg transition-colors cursor-pointer"
            data-tina-field={tinaField(data, "buttonText")}
          >
            {buttonText}
          </ModalButton>
        </div>
      </div>
    </section>
  );
};
