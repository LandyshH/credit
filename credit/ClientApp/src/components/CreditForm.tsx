import {Controller, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup, FormHelperText,
    InputLabel,
    MenuItem,
    TextField,
    Select, Box, Alert
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import React, {useState} from "react";
import {Modal} from "@material-ui/core";

interface User {
    userPersonal: UserPersonal;
    passport: Passport;
    criminalRecord: boolean;
    creditSum: number;
    purpose: Purpose;
    employment: Employment;
    otherCredits: boolean;
    deposit: Deposit;
}

interface UserPersonal {
    firstName: string;
    surName: string;
    patronymic: string;
    age: number;
}

enum Deposit {
    realty,
    carGreater3Years,
    carLess3Years,
    guarantee,
    none
}

enum Purpose {
    consumerCredit,
    realty,
    recrediting
}

enum Employment {
    unemployed,
    IE,
    contract,
    withoutContract
}

interface Passport {
    series: string;
    number: string;
    issuedBy: string;
    issueDate: Date;
    registration: string;
}

interface Response {
    percents: number;
    approved: boolean;
}

export const CreditForm = () => {

    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState<Response>({approved: false, percents: 0});
    
     function enumKeys<E>(e: E) {
        const keys = Object.keys(e).filter((element) => {
            return isNaN(Number(element));
        });
        return keys as (keyof E)[];
    }
    
     function camelPad(str: string) {
        return str
            .replace(/([A-Z]+)([A-Z][a-z])/g, ' $1 $2')
            .replace(/([a-z\d])([A-Z])/g, '$1 $2')
            .replace(/([a-zA-Z])(\d)/g, '$1 $2')
            .replace(/^./, function(str) { return str.toUpperCase(); })
            .trim();
    }
    
    
    const submit: SubmitHandler<User> = async (data, event) => {
        try {
            const response = await axios.post<Response>('/api/Credit/Percents', data);
                setAlertContent(response.data);
                setAlert(true);
        } catch (e) {
            console.log(e)
        }
    }

    const {
        control,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<User>()
    
    return (

        <div>
            <form onSubmit={handleSubmit(submit)}>
                <Controller
                    name={"userPersonal.firstName"}
                    control={control}
                    rules={{
                        required: { value: true, message: "Required" },
                        maxLength: {value: 50, message: "String must contains less or equal 50 characters"}
                    }}
                    render={({ field }) => (
                        <TextField
                            className = {'m-2'}
                            error={!!errors.userPersonal?.firstName && !!errors.userPersonal.firstName.message}
                            helperText={errors.userPersonal?.firstName?.message}
                            label="First name"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            fullWidth
                            type={"string"}
                            value={field.value ?? ""}
                            onChange={field.onChange}
                        />
                    )}
                />

                <Controller
                    name={"userPersonal.surName"}
                    control={control}
                    rules={{
                        required: { value: true, message: "Required" },
                        maxLength: {value: 50, message: "String must contains less or equal 50 characters"}
                    }}
                    render={({ field }) => (
                        <TextField
                            className = {'m-2'}
                            error={!!errors.userPersonal?.surName && !!errors.userPersonal.surName.message}
                            helperText={errors.userPersonal?.surName?.message}
                            label="Second name"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            fullWidth
                            type={"string"}
                            value={field.value ?? ""}
                            onChange={field.onChange}
                        />
                    )}
                />

                <Controller
                    name={"userPersonal.patronymic"}
                    control={control}
                    rules={{
                        required: { value: true, message: "Required" },
                        maxLength: {value: 50, message: "String must contains less or equal 50 characters"}
                    }}
                    render={({ field }) => (
                        <TextField
                            className = {'m-2'}
                            error={!!errors.userPersonal?.patronymic && !!errors.userPersonal.patronymic.message}
                            helperText={errors.userPersonal?.patronymic?.message}
                            label="Patronymic"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            fullWidth
                            type={"string"}
                            value={field.value ?? ""}
                            onChange={field.onChange}
                        />
                    )}
                />

                <Controller
                    name={"userPersonal.age"}
                    control={control}
                    rules={{
                        required: { value: true, message: "Required" },
                        min: { value: 21, message: "Min age 21" },
                        max: { value: 72, message: "Max age 72" }
                    }}
                    render={({ field }) => (
                        <TextField
                            className = {'m-2'}
                            error={!!errors.userPersonal?.age && !!errors.userPersonal.age.message}
                            helperText={errors.userPersonal?.age?.message}
                            label="Age"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            fullWidth
                            type={"number"}
                            value={field.value ?? ""}
                            onChange={field.onChange}
                        />
                    )}
                />
                

                <Controller
                    name={"passport.series"}
                    control={control}
                    rules={{
                        required: { value: true, message: "Required" },
                        maxLength: {value: 4, message: "Passport series must contains only 4 digits"},
                        minLength: {value: 4, message: "Passport series must contains only 4 digits"},
                        validate:
                            (value:string) => new RegExp("^\\d+$").exec(value) ? true :
                            "Passport series contains only digits"
                    }}
                    render={({ field }) => (
                        <TextField
                            className = {'m-2'}
                            error={!!errors.passport?.series && !!errors.passport.series.message}
                            helperText={errors.passport?.series?.message}
                            label="Passport series"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            fullWidth
                            type={"string"}
                            value={field.value ?? ""}
                            onChange={field.onChange}
                        />
                    )}
                />

                <Controller
                    name={"passport.number"}
                    control={control}
                    rules={{
                        required: { value: true, message: "Required" },
                        maxLength: {value: 6, message: "Passport number must contains only 6 digits"},
                        minLength: {value: 6, message: "Passport number must contains only 6 digits"},
                        validate:
                            (value) => (new RegExp("^\\d+$")).exec(value) ? true :
                                "Passport number contains only digits"
                    }}
                    render={({ field }) => (
                        <TextField
                            className = {'m-2'}
                            error={!!errors.passport?.number && !!errors.passport.number.message}
                            helperText={errors.passport?.number?.message}
                            label="Passport number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            fullWidth
                            type={"string"}
                            value={field.value ?? ""}
                            onChange={field.onChange}
                        />
                    )}
                />

                <Controller
                    name={"passport.issuedBy"}
                    control={control}
                    rules={{
                        required: { value: true, message: "Required" },
                        maxLength: {value: 200, message: "String must contains less or equal 200 characters"}
                    }}
                    render={({ field }) => (
                        <TextField
                            className = {'m-2 mb-5'}
                            error={!!errors.passport?.issuedBy && !!errors.passport.issuedBy.message}
                            helperText={errors.passport?.issuedBy?.message}
                            label="Passport issued by"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            fullWidth
                            type={"string"}
                            value={field.value ?? ""}
                            onChange={field.onChange}
                        />
                    )}
                />

                <Controller
                    name={"passport.issueDate"}
                    control={control}
                    rules={{
                        required: { value: true, message: "Required" },
                        validate: (value) =>
                            !value || value < new Date() ? true : "Enter the right date",
                    }}
                    render={({ field }) => (
                        <DatePicker
                            maxDate={new Date()}
                            InputProps={{ error: !!errors.passport?.issueDate }}
                            label={"Issue date"}
                            mask={".._"}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    helperText={errors.passport?.issueDate?.message}
                                />
                            )}
                            value={field.value ?? null}
                            onChange={field.onChange}
                        />
                    )}
                />
                
                <Controller
                    name={"passport.registration"}
                    control={control}
                    rules={{
                        required: { value: true, message: "Required" },
                        maxLength: {value: 200, message: "String must contains less or equal 200 characters"}
                    }}
                    render={({ field }) => (
                        <TextField
                            className = {'m-2 mt-5'}
                            error={!!errors.passport?.registration && !!errors.passport.registration.message}
                            helperText={errors.passport?.registration?.message}
                            label="Passport registration"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            fullWidth
                            type={"string"}
                            value={field.value ?? ""}
                            onChange={field.onChange}
                        />
                    )}
                />

                <Controller
                    name="criminalRecord"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel  className={'m-3'} control={<Checkbox />} label="Criminal record" value={field.value} onChange={field.onChange} />
                    )}
                />

                <Controller
                    name={"creditSum"}
                    control={control}
                    rules={{
                        required: { value: true, message: "Required" },
                        min: { value: 0, message: "Min credit sum 0" },
                        max: { value: 10000000, message: "Max credit sum 10000000" }
                    }}
                    render={({ field }) => (
                        <TextField
                            className = {'m-2'}
                            error={!!errors.creditSum && !!errors.creditSum.message}
                            helperText={errors.creditSum?.message}
                            label="Credit sum"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            fullWidth
                            type={"number"}
                            value={field.value ?? ""}
                            onChange={field.onChange}
                        />
                    )}
                />

                <Controller
                    name="employment"
                    control={control}
                    rules={{
                        required: { value: true, message: "Required" },
                    }}
                    render={({ field }) => (
                        <FormControl className = {'m-3'} fullWidth error={!!errors.employment}>
                            <InputLabel>Employment</InputLabel>
                            <Select
                                value={field.value ?? ""}
                                label="Employment"
                                onChange={field.onChange}
                            >
                                {enumKeys(Employment).map((key) => (
                                    <MenuItem value={Employment[key]} key={key}>
                                        {camelPad(key)}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.employment?.message}</FormHelperText>
                        </FormControl>
                    )}
                />

                <Controller
                    name="purpose"
                    control={control}
                    rules={{
                        required: { value: true, message: "Required" },
                    }}
                    render={({ field }) => (
                        <FormControl className = {'m-3'} fullWidth error={!!errors.purpose}>
                            <InputLabel>Purpose</InputLabel>
                            <Select
                                value={field.value ?? ""}
                                label="Purpose"
                                onChange={field.onChange}
                            >
                                {enumKeys(Purpose).map((key) => (
                                    <MenuItem value={Purpose[key]} key={key}>
                                        {camelPad(key)}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.purpose?.message}</FormHelperText>
                        </FormControl>
                    )}
                />

                <Controller
                    name="deposit"
                    control={control}
                    rules={{
                        required: { value: true, message: "Required" },
                    }}
                    render={({ field }) => (
                        <FormControl className = {'m-3'} fullWidth error={!!errors.deposit}>
                            <InputLabel>Deposit</InputLabel>
                            <Select
                                value={field.value ?? ""}
                                label="Deposit"
                                onChange={field.onChange}
                            >
                                {enumKeys(Deposit).map((key) => (
                                    <MenuItem value={Deposit[key]} key={key}>
                                        {camelPad(key)}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.deposit?.message}</FormHelperText>
                        </FormControl>
                    )}
                />

                <Controller
                    name="otherCredits"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel  className={'m-3'} control={<Checkbox />} label="Other credits" value={field.value} onChange={field.onChange} />
                    )}
                />

                <div className = {'mb-5 text-center'}>
                    <Button type={'submit'} color={"primary"} variant="contained">Send</Button>
                </div>
            </form>

            <div className={'mb-5'}>
                {alert ? 
                    <Alert severity={alertContent.approved ? 'success' : 'error'}>
                        {alertContent.approved 
                            ? `Your credit approved! Percents: ${alertContent.percents}%` 
                            : 'Your credit was not approved'}
                    </Alert> : ''
                }
            </div>
        </div>
    );
}