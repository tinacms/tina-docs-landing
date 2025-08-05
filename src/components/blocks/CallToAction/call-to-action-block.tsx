import React from "react";
import { tinaField } from "tinacms/dist/react";
import { Button } from "../../ui/button";
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
                className="text-xl max-w-3xl mx-auto"
                data-tina-field={tinaField({ description })}
              >
                {description}
              </div>
            )}
          </div>
        )}

        {actions && actions.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {actions.map((action, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                {action.selectedIcon && (
                  <div>
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
                    className="text-xl font-semibold text-gray-900 mb-2"
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
                    className="text-gray-600 mb-4"
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
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors"
            data-tina-field={tinaField({ buttonText })}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
};
