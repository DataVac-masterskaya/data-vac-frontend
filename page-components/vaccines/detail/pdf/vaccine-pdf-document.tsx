import { Document, Page, Text, Image, View } from '@react-pdf/renderer'
import type { VaccinePdfData } from './vaccine-pdf.types'
import { pdfStyles as s } from './vaccine-pdf.styles'

type Props = {
  data: VaccinePdfData
  qrImages?: { specialist?: string; nonspec?: string }
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View wrap={false}>
      <Text style={s.sectionTitle}>{title}</Text>
      {children}
    </View>
  )
}

export function VaccinePdfDocument({ data, qrImages }: Props) {
  return (
    <Document title={data.name}>
      <Page size="A4" style={s.page}>
        {/* Header: DataVac + 2 QR */}
        <View style={s.header}>
          <View style={s.brandBlock}>
            <Text style={s.brandTitle}>DataVac</Text>
            <Text style={s.brandSubtitle}>
              Структурированная информация с сайта Государственного реестра лекарственных средств
            </Text>
          </View>
          <View style={s.qrBlock}>
            {qrImages?.specialist ? (
              <View style={s.qrItem}>
                <Image src={qrImages.specialist} style={s.qrImage} />
                <Text style={s.qrLabel}>Специалистов</Text>
              </View>
            ) : null}
            {qrImages?.nonspec ? (
              <View style={s.qrItem}>
                <Image src={qrImages.nonspec} style={s.qrImage} />
                <Text style={s.qrLabel}>Неспециалистов</Text>
              </View>
            ) : null}
          </View>
        </View>

        <Text style={s.h1}>{data.name}</Text>

        {data.officialName ? (
          <Section title="Полное название вакцины">
            <Text style={s.bold}>{data.officialName}</Text>
          </Section>
        ) : null}

        {data.infections.length > 0 ? (
          <Section title="Инфекция">
            <Text style={s.text}>{data.infections.join(', ')}</Text>
          </Section>
        ) : null}

        {data.ageAllowed ? (
          <Section title="Допустимый возраст">
            <Text style={s.text}>{data.ageAllowed}</Text>
          </Section>
        ) : null}

        {data.administrationMethods.length > 0 ? (
          <Section title="Способ введения">
            <View style={s.methodsRow}>
              {data.administrationMethods.map((m, i) => (
                <View key={`${m.title}-${i}`} style={s.methodCard}>
                  <Text style={s.bold}>{m.title}</Text>
                  {m.ageGroup ? <Text style={s.text}>{m.ageGroup}</Text> : null}
                  {/* картинки: абсолютный URL нужен в браузере — см. ниже */}
                  <Image src={m.imageSrc} style={s.methodImage} />
                </View>
              ))}
            </View>
          </Section>
        ) : null}

        {data.contraindications.length > 0 ? (
          <Section title="Противопоказания">
            {data.contraindications.map((c, i) => (
              <Text key={`${c.name}-${i}`} style={s.text}>
                • {c.name}
              </Text>
            ))}
          </Section>
        ) : null}

        {/* Двухколоночный блок */}
        <View style={s.row}>
          <View style={s.col}>
            {data.ingredients.length > 0 ? (
              <Section title="Состав">
                {data.ingredients.map((g) => (
                  <View key={g.role}>
                    <Text style={s.bold}>{g.role}</Text>
                    {g.names.map((n) => (
                      <Text key={n} style={s.text}>{n}</Text>
                    ))}
                  </View>
                ))}
              </Section>
            ) : null}
            {data.storageConditions ? (
              <Section title="Хранение">
                <Text style={s.text}>{data.storageConditions}</Text>
              </Section>
            ) : null}
          </View>
          <View style={s.col}>
            {data.interactionInfo ? (
              <Section title="Взаимодействие с препаратами">
                <Text style={s.text}>{data.interactionInfo}</Text>
              </Section>
            ) : null}
            {data.pregnancyLabel ? (
              <Section title="Применение при беременности и ГВ">
                <Text style={s.text}>{data.pregnancyLabel}</Text>
              </Section>
            ) : null}
            {data.compatibilityInfo ? (
              <Section title="Одновременное введение">
                <Text style={s.text}>{data.compatibilityInfo}</Text>
              </Section>
            ) : null}
          </View>
        </View>

        {/* Блок «Информация из инструкции» */}
        {data.instructionSections.length > 0 ? (
          <>
            <Text style={s.divider}>Информация из инструкции:</Text>
            {data.instructionSections.map((sec) => (
              <Section key={sec.title} title={sec.title}>
                {Array.isArray(sec.content) ? (
                  sec.content.map((line) => (
                    <Text key={line} style={s.text}>• {line}</Text>
                  ))
                ) : (
                  <Text style={s.text}>{sec.content}</Text>
                )}
              </Section>
            ))}
          </>
        ) : null}

        {/* АНО — только если есть */}
        {data.orgComment ? (
          <View style={s.commentBox}>
            <Text style={s.sectionTitle}>Комментарий АНО «Коллективный иммунитет»</Text>
            <Text style={s.bold}>{data.orgComment}</Text>
          </View>
        ) : null}

        {data.revisionDate ? (
          <Text style={{ marginTop: 8, fontSize: 9 }}>
            Дата последней ревизии: {data.revisionDate}
          </Text>
        ) : null}

        <Text
          style={s.footer}
          render={({ pageNumber }) => `стр. ${pageNumber}`}
          fixed
        />
      </Page>
    </Document>
  )
}