import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";

const formSchema = z.object({
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "description must be greater than one word" }),
  link: z
    .string({ required_error: "link is required" })
    .min(1, { message: "link must be greater than one word" }),
  start_time: z.any(),
  end_time: z.any(),
  is_visible: z.boolean(),
});

export interface FormData extends z.infer<typeof formSchema> {
  id: string;
  title: string;
  onSubmit: SubmitHandler<FormData>;
}

// making the
export const BannerForm: React.FC<Partial<FormData>> = (prop) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      description: prop?.description ?? "",
      link: prop?.link ?? "",
      is_visible: prop?.is_visible ?? true,
      start_time: prop.start_time && dayjs(prop.start_time),
      end_time: prop.end_time && dayjs(prop.end_time),
    },
    resolver: zodResolver(formSchema),
  });

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      className="w-[400px] flex flex-col items-center gap-[30px]  p-[20px] rounded-md bg-white"
      onSubmit={handleSubmit(prop.onSubmit!)}
    >
      <h1 className="text-[25px] font-bold">{prop.title}</h1>
      <div className="flex flex-col gap-[30px]">
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value, ref } }) => (
            <div>
              <TextField
                ref={ref}
                className="w-[300px]"
                id="description"
                label="Description"
                variant="outlined"
                value={value}
                onChange={onChange}
                error={errors.description ? true : false}
              />
              {errors.description && (
                <div className="text-[tomato]">
                  {errors.description.message}
                </div>
              )}
            </div>
          )}
        />

        <Controller
          control={control}
          name="link"
          render={({ field: { onChange, value, ref } }) => (
            <div>
              <TextField
                ref={ref}
                className="w-[300px]"
                id="link"
                label="link"
                variant="outlined"
                value={value}
                onChange={onChange}
                error={errors.link ? true : false}
              />
              {errors.link && (
                <div className="text-[tomato]">{errors.link.message}</div>
              )}
            </div>
          )}
        />
        <Controller
          control={control}
          name="start_time"
          render={({ field: { onChange, value, ref } }) => (
            <DateTimePicker
              className="w-[300px]"
              ref={ref}
              onChange={onChange}
              value={value}
              label="Start date"
            />
          )}
        />
        <Controller
          control={control}
          name="end_time"
          render={({ field: { onChange, value, ref } }) => (
            <DateTimePicker
              className="w-[300px]"
              ref={ref}
              onChange={onChange}
              value={value}
              label="End date"
            />
          )}
        />
        <Controller
          control={control}
          name="is_visible"
          render={({ field: { onChange, value, ref } }) => (
            <div className="flex items-center ">
              <Switch
                ref={ref}
                id="visiblity"
                checked={value}
                onChange={onChange}
                inputProps={{ "aria-label": "controlled" }}
              />
              <label htmlFor="visiblity">Visiblity</label>
            </div>
          )}
        />
      </div>

      <input
        className="w-[300px] h-[50px] bg-[#1DA1F1] hover:bg-[#1da0f1dc] rounded-md text-white text-[20px] font-[500] cursor-pointer"
        type="submit"
      />
    </form>
  );
};
