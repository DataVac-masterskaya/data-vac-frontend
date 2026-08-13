import { Document, Page, Text, Image, View } from '@react-pdf/renderer'
import type { ReactNode } from 'react'
import type { VaccinePdfData } from './vaccine-pdf.types'
import { pdfStyles as s } from './vaccine-pdf.styles'

type Props = {
  data: VaccinePdfData
  qrImages?: { specialist?: string; nonspec?: string }
}

function Section({
  title,
  children,
  wrap = true,
}: {
  title: string
  children: ReactNode
  wrap?: boolean
}) {
  return (
    <View wrap={wrap}>
      <Text style={s.sectionTitle}>{title}</Text>
      {children}
    </View>
  )
}

function StatusBadge({
  tone,
  symbol,
  children,
}: {
  tone: 'danger' | 'warn' | 'ok'
  symbol: string
  children: ReactNode
}) {
  const iconStyle =
    tone === 'danger' ? s.statusIconDanger : tone === 'warn' ? s.statusIconWarn : s.statusIconOk

  return (
    <View style={s.statusRow}>
      <View style={iconStyle}>
        <Text style={s.statusIconText}>{symbol}</Text>
      </View>
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  )
}

function QrSlot({ src, label }: { src: string; label: string }) {
  return (
    <View style={s.qrItem}>
      <Image src={src} style={s.qrImage} />
      <Text style={s.qrLabel}>{label}</Text>
    </View>
  )
}

export function VaccinePdfDocument({ data, qrImages }: Props) {
  const hasQr = Boolean(qrImages?.specialist || qrImages?.nonspec)
  const ingredients = data.ingredients ?? []
  const storageLines = data.storageLines ?? []
  const administrationMethods = data.administrationMethods ?? []
  const contraindicationGroups = data.contraindicationGroups ?? []
  const instructionSections = data.instructionSections ?? []
  const infections = data.infections ?? []

  const hasTwoCol =
    ingredients.length > 0 ||
    storageLines.length > 0 ||
    Boolean(data.interactionInfo) ||
    Boolean(data.pregnancyLabel) ||
    Boolean(data.compatibilityInfo)

  return (
    <Document title={data.name}>
      <Page size="A4" style={s.page}>
        <View style={s.header} wrap={false}>
          <View style={s.brandBlock}>
            <Image src={data.logoSrc} style={s.logo} />
            <Text style={s.brandSubtitle}>
              {`Структурированная информация с сайта\nГосударственного реестра лекарственных средств`}
            </Text>
          </View>

          {hasQr ? (
            <View style={s.qrHeader}>
              <Text style={s.qrCaption}>Ссылка на версию инструкции для:</Text>
              <View style={s.qrBlock}>
                {qrImages?.specialist ? (
                  <QrSlot src={qrImages.specialist} label="Специалистов" />
                ) : null}
                {qrImages?.nonspec ? (
                  <QrSlot src={qrImages.nonspec} label="Неспециалистов" />
                ) : null}
              </View>
            </View>
          ) : null}
        </View>

        <Text style={s.h1}>{data.name}</Text>

        {data.officialName ? (
          <Section title="Полное название вакцины">
            <Text style={s.textBold}>{data.officialName}</Text>
          </Section>
        ) : null}

        {infections.length > 0 || data.ageAllowed ? (
          <View style={s.row}>
            <View style={s.col}>
              {infections.length > 0 ? (
                <Section title="Инфекции">
                  <Text style={s.textBold}>{infections.join(', ')}</Text>
                </Section>
              ) : null}
            </View>
            <View style={s.colLast}>
              {data.ageAllowed ? (
                <Section title="Допустимый возраст">
                  <Text style={s.textBold}>{data.ageAllowed}</Text>
                </Section>
              ) : null}
            </View>
          </View>
        ) : null}

        {administrationMethods.length > 0 ? (
          <Section title="Способ введения" wrap={false}>
            <View style={s.methodsRow}>
              {administrationMethods.map((m, i) => (
                <View key={`${m.title}-${i}`} style={s.methodCard} wrap={false}>
                  <Text style={s.methodTitle}>{m.title}</Text>
                  <Image src={m.imageSrc} style={s.methodImage} />
                  {m.ageGroup ? <Text style={s.methodAge}>{m.ageGroup}</Text> : null}
                </View>
              ))}
            </View>
          </Section>
        ) : null}

        {contraindicationGroups.length > 0 ? (
          <Section title="Противопоказания">
            {contraindicationGroups.map((group) => (
              <View key={group.label} style={{ marginBottom: 8 }}>
                <Text style={s.muted}>{group.label}</Text>
                {(group.items ?? []).map((name) => (
                  <View key={name} style={s.contraItem}>
                    <Text style={s.contraName}>{name}</Text>
                  </View>
                ))}
              </View>
            ))}
          </Section>
        ) : null}

        {hasTwoCol ? (
          <View style={s.row}>
            <View style={s.col}>
              {ingredients.length > 0 ? (
                <Section title="Состав">
                  {ingredients.map((g) => (
                    <View key={g.role}>
                      <Text style={s.roleLabel}>{g.role}</Text>
                      {(g.names ?? []).map((n) => (
                        <Text key={n} style={s.textBold}>
                          {n}
                        </Text>
                      ))}
                    </View>
                  ))}
                </Section>
              ) : null}
              {storageLines.length > 0 ? (
                <Section title="Хранение">
                  {storageLines.map((line) => (
                    <Text key={line} style={s.storageLine}>
                      — {line}
                    </Text>
                  ))}
                </Section>
              ) : null}
            </View>
            <View style={s.colLast}>
              {data.interactionInfo ? (
                <Section title="Взаимодействие с препаратами">
                  <StatusBadge tone="danger" symbol="x">
                    <Text style={s.textBold}>{data.interactionInfo}</Text>
                  </StatusBadge>
                </Section>
              ) : null}
              {data.pregnancyLabel ? (
                <Section title="Применение при беременности и ГВ">
                  <StatusBadge
                    tone={data.pregnancyCaution ? 'warn' : 'ok'}
                    symbol={data.pregnancyCaution ? '!' : '+'}
                  >
                    <Text style={s.textBold}>{data.pregnancyLabel}</Text>
                  </StatusBadge>
                </Section>
              ) : null}
              {data.compatibilityInfo ? (
                <Section title="Одновременное введение">
                  <StatusBadge tone="ok" symbol="+">
                    <Text style={s.textBold}>{data.compatibilityInfo}</Text>
                  </StatusBadge>
                </Section>
              ) : null}
            </View>
          </View>
        ) : null}

        {instructionSections.length > 0 ? (
          <View>
            <Text style={s.divider}>Информация из инструкции:</Text>
            {instructionSections.map((sec) => (
              <Section key={sec.title} title={sec.title}>
                {Array.isArray(sec.content) ? (
                  sec.content.map((line) => (
                    <Text key={line} style={s.text}>
                      • {line}
                    </Text>
                  ))
                ) : (
                  <Text style={s.text}>{sec.content}</Text>
                )}
              </Section>
            ))}
          </View>
        ) : null}

        {data.orgComment ? (
          <View style={s.commentBox}>
            <Text style={s.commentTitle}>Комментарий АНО «Коллективный иммунитет»</Text>
            <Text style={s.textBold}>{data.orgComment}</Text>
          </View>
        ) : null}

        {data.revisionDate ? (
          <Text style={s.revisionDate}>Дата последней ревизии: {data.revisionDate}</Text>
        ) : null}

        <Text style={s.footer} render={({ pageNumber }) => `стр. ${pageNumber}`} fixed />
      </Page>
    </Document>
  )
}
